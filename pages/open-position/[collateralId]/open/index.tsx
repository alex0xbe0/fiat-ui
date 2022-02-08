import s from './s.module.scss'
import { Button } from 'antd'
import AntdForm from 'antd/lib/form'
import { ethers } from 'ethers'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useMemo } from 'react'
import BigNumber from 'bignumber.js'
import { useMachine } from '@xstate/react'
import stepperMachine, { TITLES_BY_STEP } from '@/src/state/open-position-form'
import { contracts } from '@/src/constants/contracts'
import { DEFAULT_ADDRESS, getHumanValue } from '@/src/web3/utils'
import { useWeb3Connection } from '@/src/providers/web3ConnectionProvider'
import { useTokenSymbol } from '@/src/hooks/contracts/useTokenSymbol'
import genericSuspense from '@/src/utils/genericSuspense'
import { Form } from '@/src/components/antd'
import { Grid, TokenAmount } from '@/src/components/custom'
import ElementIcon from '@/src/resources/svg/element.svg'
import FiatIcon from '@/src/resources/svg/fiat-icon.svg'
import useUserProxy from '@/src/hooks/useUserProxy'
import useContractCall from '@/src/hooks/contracts/useContractCall'
import { ERC20 } from '@/types/typechain'
import { useUserActions } from '@/src/hooks/useUserActions'
import { useERC20Allowance } from '@/src/hooks/useERC20Allowance'

const StepperTitle: React.FC<{
  title: string
  subtitle: string
  currentStep: number
  totalSteps: number
}> = ({ currentStep, subtitle, title, totalSteps }) => (
  <Grid className={s.header} flow="row" gap={16} rowsTemplate="auto">
    <Grid align="center" colsTemplate="auto 1fr" flow="col">
      <h2>{title}</h2>
      <p className={s.steps}>
        <span className={s.currentStep}>{currentStep}</span>/{totalSteps}
      </p>
    </Grid>

    <p>{subtitle}</p>
  </Grid>
)

const OpenPositionSummary: React.FC<{
  currentCollateralValue: number
  outstandingFIATDebt: number
  newFIATDebt: number
  stabilityFee: number
}> = ({ currentCollateralValue, newFIATDebt, outstandingFIATDebt, stabilityFee }) => {
  return (
    <Grid className={s.summary} flow="row" gap={8}>
      <Grid colsTemplate="auto auto" flow="col">
        <div className={s.summaryTitle}>Current collateral value</div>
        <div className={s.summaryValue}>{currentCollateralValue}</div>
      </Grid>
      <Grid colsTemplate="auto auto" flow="col">
        <div className={s.summaryTitle}>Outstanding FIAT debt</div>
        <div className={s.summaryValue}>{outstandingFIATDebt}</div>
      </Grid>
      <Grid colsTemplate="auto auto" flow="col">
        <div className={s.summaryTitle}>New FIAT debt</div>
        <div className={s.summaryValue}>{newFIATDebt}</div>
      </Grid>
      <Grid colsTemplate="auto auto" flow="col">
        <div className={s.summaryTitle}>Stability fee</div>
        <div className={s.summaryValue}>{stabilityFee}</div>
      </Grid>
    </Grid>
  )
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const FormERC721: React.FC<{ tokenSymbol: string; value: string }> = ({ tokenSymbol, value }) => {
  const showModal = () => {
    console.log('showModal')
  }

  return (
    <>
      <div className="container">
        <div className="container">
          <StepperTitle
            currentStep={1}
            subtitle="Select which asset to deposit and how much FIAT to mint."
            title="Configure your position"
            totalSteps={7}
          />
          <div className="content-body">
            <div className="content-body-item">
              <div className="content-body-item-title">
                <h4>Deposit {tokenSymbol}</h4>
                <p>Current value: {value}</p>
              </div>
              <div className="content-body-item-body">
                {/* TODO: should this modal behave as a 'select' input? */}
                <Button onClick={showModal}>Select from wallet</Button>
                {/* TODO: verify that the user does not have a proxy already */}
                <Button disabled>Setup Proxy</Button>
              </div>
              <OpenPositionSummary
                currentCollateralValue={0}
                newFIATDebt={0}
                outstandingFIATDebt={0}
                stabilityFee={0}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

type FormProps = { tokenAmount: BigNumber; fiatAmount: BigNumber }

const FormERC20: React.FC<{ tokenSymbol: string; tokenAddress: string }> = ({
  tokenAddress,
  tokenSymbol,
}) => {
  const [form] = AntdForm.useForm<FormProps>()

  const { address: currentUserAddress, isAppConnected, web3Provider } = useWeb3Connection()
  const { isProxyAvailable, loadingProxy, setupProxy, userProxy, userProxyAddress } = useUserProxy()
  const { allowance, approve, hasAllowance, loadingApprove } = useERC20Allowance(
    tokenAddress,
    userProxyAddress ?? '',
  )

  const userActions = useUserActions()
  const [balance, refetchErc20Balance] = useContractCall<
    ERC20,
    'balanceOf',
    [string],
    Promise<ethers.BigNumber>
  >(tokenAddress, contracts.ERC_20.abi, 'balanceOf', [currentUserAddress || DEFAULT_ADDRESS])

  // Setup Proxy :tick
  // Allowance loading:tick
  // Deposit :loading
  const humanReadableValue = useMemo(
    () => (balance ? getHumanValue(BigNumber.from(balance.toString()), 6) : 0),
    [balance],
  )

  const [stateMachine, send] = useMachine(stepperMachine, {
    context: {
      isProxyAvailable,
      hasAllowance,
      tokenAddress,
      tokenSymbol,
    },
  })

  // hasAllowance comes in false on init.
  // This useEffect change hasAllowance value on Machine
  useEffect(() => {
    if (hasAllowance) send({ type: 'SET_HAS_ALLOWANCE', hasAllowance })
  }, [hasAllowance, send])

  return (
    <Grid flow="row" gap={16}>
      <StepperTitle
        currentStep={stateMachine.context.currentStepNumber}
        subtitle={TITLES_BY_STEP[stateMachine.context.currentStepNumber].subtitle}
        title={TITLES_BY_STEP[stateMachine.context.currentStepNumber].title}
        totalSteps={stateMachine.context.totalStepNumber}
      />
      <Grid align="center" colsTemplate="auto auto" flow="col">
        <h3>Deposit {stateMachine.context.tokenSymbol}</h3>
        <p className={s.currentValue}>Current value: {humanReadableValue?.toFixed()}</p>
      </Grid>
      <Form form={form} initialValues={{ tokenAmount: 0, fiatAmount: 0 }}>
        {[1, 4].includes(stateMachine.context.currentStepNumber) && (
          <div className="content-body-item-body">
            <Form.Item name="tokenAmount" required>
              <TokenAmount
                displayDecimals={4}
                max={humanReadableValue}
                maximumFractionDigits={6}
                onChange={(val) => val && send({ type: 'SET_ERC20_AMOUNT', erc20Amount: val })}
                slider
                tokenIcon={<ElementIcon />}
              />
            </Form.Item>
          </div>
        )}
        {stateMachine.context.currentStepNumber === 1 && (
          <>
            {!isProxyAvailable && (
              <div className="content-body-item-body">
                <Button
                  disabled={!stateMachine.context.erc20Amount.gt(0)}
                  onClick={() => send({ type: 'CLICK_SETUP_PROXY' })}
                >
                  Setup Proxy
                </Button>
              </div>
            )}

            {!hasAllowance && (
              <div className="content-body-item-body">
                <Button
                  disabled={!stateMachine.context.erc20Amount.gt(0) || !isProxyAvailable}
                  onClick={() => send({ type: 'CLICK_ALLOW' })}
                >
                  Allow Collateral management
                </Button>
              </div>
            )}
          </>
        )}

        {stateMachine.context.currentStepNumber === 2 && (
          <div className="content-body-item-body">
            <Button loading={loadingProxy} onClick={setupProxy}>
              Create Proxy
            </Button>
          </div>
        )}
        {stateMachine.context.currentStepNumber === 3 && (
          <div className="content-body-item-body">
            <Button loading={loadingApprove} onClick={approve}>
              Approve
            </Button>
          </div>
        )}

        {stateMachine.context.currentStepNumber === 4 && (
          <>
            <div className="content-body-item-body">
              <Form.Item name="fiatAmount" required>
                <TokenAmount
                  disabled={false}
                  displayDecimals={4}
                  max={stateMachine.context.erc20Amount.toNumber()}
                  maximumFractionDigits={6}
                  onChange={(val) => val && send({ type: 'SET_FIAT_AMOUNT', fiatAmount: val })}
                  slider
                  tokenIcon={<FiatIcon />}
                />
              </Form.Item>
            </div>
            <div className="content-body-item-body">
              <Button onClick={() => send({ type: 'CLICK_DEPLOY' })}>Deposit collateral</Button>
            </div>
          </>
        )}

        {[1, 4, 5].includes(stateMachine.context.currentStepNumber) && (
          <OpenPositionSummary
            currentCollateralValue={stateMachine.context.erc20Amount.toNumber()}
            newFIATDebt={0}
            outstandingFIATDebt={0}
            stabilityFee={0}
          />
        )}
        {stateMachine.context.currentStepNumber === 5 && (
          <>
            <div className="content-body-item-body">Summary...</div>
            <div className="content-body-item-body">
              <Form.Item>
                <Button
                  disabled={!hasAllowance || !isProxyAvailable}
                  onClick={() =>
                    send({
                      type: 'CONFIRM',
                      // @ts-ignore TODO types
                      currentUserAddress,
                      isAppConnected,
                      web3Provider,
                      userActions,
                      userProxy,
                      refetchErc20Balance,
                      allowance,
                    })
                  }
                  type="primary"
                >
                  Confirm
                </Button>
              </Form.Item>
            </div>
          </>
        )}
      </Form>
    </Grid>
  )
}

const OpenPosition = () => {
  const {
    query: { collateralId: tokenAddress },
  } = useRouter()
  const { tokenSymbol } = useTokenSymbol(tokenAddress as string)

  return (
    <>
      {/* TODO: implement dynamic titles */}
      {/*<Header title={`Open ${tokenSymbol} position`} />*/}
      <Link href="/open-position" passHref>
        <Button>Back</Button>
      </Link>
      <FormERC20 tokenAddress={tokenAddress as string} tokenSymbol={tokenSymbol} />
    </>
  )
}

export default genericSuspense(OpenPosition)