import s from './s.module.scss'
import { useMachine } from '@xstate/react'
import AntdForm from 'antd/lib/form'
import BigNumber from 'bignumber.js'
import cn from 'classnames'
import { ethers } from 'ethers'
import { useEffect, useMemo, useState } from 'react'
import withRequiredConnection from '@/src/hooks/RequiredConnection'
import { Form } from '@/src/components/antd'
import ButtonGradient from '@/src/components/antd/button-gradient'
import { RadioTab, RadioTabsWrapper } from '@/src/components/antd/radio-tab'
import { ButtonBack } from '@/src/components/custom/button-back'
import { Balance } from '@/src/components/custom/balance'
import { ButtonExtraFormAction } from '@/src/components/custom/button-extra-form-action'
import { ButtonsWrapper } from '@/src/components/custom/buttons-wrapper'
import { FormExtraAction } from '@/src/components/custom/form-extra-action'
import { PositionFormsLayout } from '@/src/components/custom/position-forms-layout'
import { Summary } from '@/src/components/custom/summary'
import TokenAmount from '@/src/components/custom/token-amount'
import { contracts } from '@/src/constants/contracts'
import { ZERO_ADDRESS } from '@/src/constants/misc'
import useContractCall from '@/src/hooks/contracts/useContractCall'
import { useTokenSymbol } from '@/src/hooks/contracts/useTokenSymbol'
import { useDynamicTitle } from '@/src/hooks/useDynamicTitle'
import { useERC20Allowance } from '@/src/hooks/useERC20Allowance'
import { useUserActions } from '@/src/hooks/useUserActions'
import useUserProxy from '@/src/hooks/useUserProxy'
import { useWeb3Connection } from '@/src/providers/web3ConnectionProvider'
import ElementIcon from '@/src/resources/svg/element.svg'
import FiatIcon from '@/src/resources/svg/fiat-icon.svg'
import Success from '@/src/resources/svg/success.svg'
import stepperMachine, { TITLES_BY_STEP } from '@/src/state/open-position-form'
import { getHumanValue } from '@/src/web3/utils'
import { ERC20 } from '@/types/typechain'
import { useQueryParam } from '@/src/hooks/useQueryParam'

const StepperTitle: React.FC<{
  currentStep: number
  description: string
  title: string
  totalSteps: number
}> = ({ currentStep, description, title, totalSteps }) => (
  <div className={cn(s.stepperWrapper)}>
    <div className={cn(s.stepperTitleWrapper)}>
      <h2 className={cn(s.stepperTitle)}>{title}</h2>
      <div className={cn(s.steps)}>
        <span className={cn(s.currentStep)}>{currentStep}</span>/{totalSteps}
      </div>
    </div>
    <p className={cn(s.stepperDescription)}>{description}</p>
  </div>
)

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
  >(tokenAddress, contracts.ERC_20.abi, 'balanceOf', [currentUserAddress || ZERO_ADDRESS])

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
      loading: true,
    },
  })

  // hasAllowance comes in false on init.
  // This useEffect change hasAllowance value on Machine
  useEffect(() => {
    send({ type: 'SET_HAS_ALLOWANCE', hasAllowance })
    send({ type: 'SET_PROXY_AVAILABLE', isProxyAvailable })
    send({ type: 'SET_LOADING', loading: false })
  }, [hasAllowance, isProxyAvailable, send])

  const [tab, setTab] = useState('bond')
  const [mintFiat, setMintFiat] = useState(false)

  const toggleMintFiat = () => setMintFiat(!mintFiat)

  const mockedSummaryData = [
    {
      title: 'In your wallet',
      value: '5,000 DAI Principal Token',
    },
    {
      title: 'Depositing into position ',
      value: '5,000 DAI Principal Token',
    },
    {
      title: 'Remaining in wallet',
      value: '0 DAI Principal Token',
    },
    {
      title: 'FIAT to be minted',
      value: '2,000',
    },
    {
      state: 'ok',
      title: 'Updated health factor',
      value: '2.3',
    },
  ]

  return (
    <>
      {stateMachine.context.currentStepNumber !== 7 ? (
        <>
          <StepperTitle
            currentStep={stateMachine.context.currentStepNumber}
            description={TITLES_BY_STEP[stateMachine.context.currentStepNumber].subtitle}
            title={TITLES_BY_STEP[stateMachine.context.currentStepNumber].title}
            totalSteps={stateMachine.context.totalStepNumber}
          />
          <div className={cn(s.form)}>
            {stateMachine.context.currentStepNumber === 1 && (
              <RadioTabsWrapper className={cn(s.radioTabsWrapper)}>
                <RadioTab checked={tab === 'bond'} onClick={() => setTab('bond')}>
                  Bond
                </RadioTab>
                <RadioTab checked={tab === 'underlying'} onClick={() => setTab('underlying')}>
                  Underlying
                </RadioTab>
              </RadioTabsWrapper>
            )}
            {[1, 4].includes(stateMachine.context.currentStepNumber) && (
              <Balance
                title={`Deposit ${stateMachine.context.tokenSymbol}`}
                value={`Available:
              ${humanReadableValue?.toFixed()}`}
              />
            )}
            <Form form={form} initialValues={{ tokenAmount: 0, fiatAmount: 0 }}>
              {[1, 4].includes(stateMachine.context.currentStepNumber) && (
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
              )}
              {stateMachine.context.currentStepNumber === 1 && (
                <ButtonsWrapper>
                  {!isProxyAvailable && (
                    <ButtonGradient
                      disabled={!stateMachine.context.erc20Amount.gt(0)}
                      height="lg"
                      onClick={() => send({ type: 'CLICK_SETUP_PROXY' })}
                    >
                      Setup Proxy
                    </ButtonGradient>
                  )}
                  {!hasAllowance && (
                    <ButtonGradient
                      disabled={!stateMachine.context.erc20Amount.gt(0) || !isProxyAvailable}
                      height="lg"
                      onClick={() => send({ type: 'CLICK_ALLOW' })}
                    >
                      Set Allowance
                    </ButtonGradient>
                  )}
                </ButtonsWrapper>
              )}
              {stateMachine.context.currentStepNumber === 2 && (
                <ButtonsWrapper>
                  <ButtonGradient height="lg" loading={loadingProxy} onClick={setupProxy}>
                    Create Proxy
                  </ButtonGradient>
                  <button className={s.backButton} onClick={() => console.log('go back')}>
                    &#8592; Go back
                  </button>
                </ButtonsWrapper>
              )}
              {stateMachine.context.currentStepNumber === 3 && (
                <ButtonGradient height="lg" loading={loadingApprove} onClick={approve}>
                  Set Allowance for TOKEN_NAME
                </ButtonGradient>
              )}
              {stateMachine.context.currentStepNumber === 4 && (
                <>
                  {mintFiat && (
                    <FormExtraAction
                      bottom={
                        <Form.Item name="fiatAmount" required style={{ marginBottom: 0 }}>
                          <TokenAmount
                            disabled={false}
                            displayDecimals={4}
                            max={stateMachine.context.erc20Amount.toNumber()}
                            maximumFractionDigits={6}
                            onChange={(val) =>
                              val && send({ type: 'SET_FIAT_AMOUNT', fiatAmount: val })
                            }
                            slider="healthFactorVariant"
                            tokenIcon={<FiatIcon />}
                          />
                        </Form.Item>
                      }
                      buttonText="Mint FIAT with this transaction"
                      onClick={toggleMintFiat}
                      top={<Balance title={`Mint FIAT`} value={`Available: 4,800`} />}
                    />
                  )}
                  <ButtonsWrapper>
                    {!mintFiat && (
                      <ButtonExtraFormAction onClick={() => toggleMintFiat()}>
                        Mint FIAT with this transaction
                      </ButtonExtraFormAction>
                    )}
                    <ButtonGradient height="lg" onClick={() => send({ type: 'CLICK_DEPLOY' })}>
                      Deposit collateral
                    </ButtonGradient>
                  </ButtonsWrapper>
                </>
              )}
              {stateMachine.context.currentStepNumber === 5 && (
                <>
                  <Summary data={mockedSummaryData} />
                  <ButtonsWrapper>
                    <ButtonGradient
                      disabled={!hasAllowance || !isProxyAvailable}
                      height="lg"
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
                    >
                      Confirm
                    </ButtonGradient>
                    <button className={cn(s.backButton)} onClick={() => console.log('go back')}>
                      &#8592; Go back
                    </button>
                  </ButtonsWrapper>
                </>
              )}
            </Form>
          </div>
        </>
      ) : (
        <div className={cn(s.form)}>
          {/* Note: this will be replaced with the actual animation */}
          <div className={cn(s.lastStepAnimation)}>
            <Success />
          </div>
          <h1 className={cn(s.lastStepTitle)}>Congrats!</h1>
          <p className={cn(s.lastStepText)}>Your position has been successfully created.</p>
          <Summary data={mockedSummaryData} />
          <ButtonGradient height="lg">Go to bb_sBond_cDAI position</ButtonGradient>
        </div>
      )}
    </>
  )
}

const OpenPosition = () => {
  const tokenAddress = useQueryParam('collateralId')
  const { tokenSymbol } = useTokenSymbol(tokenAddress as string)
  useDynamicTitle(tokenSymbol && `Create ${tokenSymbol} position`)

  const mockedBlocks = [
    {
      title: 'Bond Name',
      url: 'https://google.com',
      value: 'eursCRV',
    },
    {
      title: 'Underlying',
      url: 'https://google.com',
      value: 'DAI',
    },
    {
      title: 'Bond Maturity',
      tooltip: 'Tooltip text',
      value: '16 May, 2021',
    },
    {
      title: 'Bond Face Value',
      tooltip: 'Tooltip text',
      value: '$100.00',
    },
    {
      title: 'Bond Collateral Value',
      tooltip: 'Tooltip text',
      value: '$150.00',
    },
    {
      title: 'Collateralization Ratio',
      tooltip: 'Tooltip text',
      value: '43%',
    },
    {
      title: 'Stability fee',
      tooltip: 'Tooltip text',
      value: '0',
    },
  ]

  return (
    <>
      <ButtonBack href="/create-position">Back</ButtonBack>
      <PositionFormsLayout
        form={<FormERC20 tokenAddress={tokenAddress as string} tokenSymbol={tokenSymbol} />}
        infoBlocks={mockedBlocks}
      />
    </>
  )
}

export default withRequiredConnection(OpenPosition)