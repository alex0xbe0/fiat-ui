import s from './s.module.scss'
import cn from 'classnames'
import React, { useEffect, useState } from 'react'
import AntdForm from 'antd/lib/form'
import BigNumber from 'bignumber.js'
import Lottie from 'lottie-react'
import Link from 'next/link'
import withRequiredConnection from '@/src/hooks/RequiredConnection'
import { useDynamicTitle } from '@/src/hooks/useDynamicTitle'
import { PositionFormsLayout } from '@/src/components/custom/position-forms-layout'
import { ButtonBack } from '@/src/components/custom/button-back'
import { RadioTab, RadioTabsWrapper } from '@/src/components/antd/radio-tab'
import {
  useManageFormSummary,
  useManagePositionForm,
  useManagePositionInfo,
  useManagePositionsInfoBlock,
} from '@/src/hooks/managePosition'
import { Position, isValidHealthFactor } from '@/src/utils/data/positions'
import { ButtonsWrapper } from '@/src/components/custom/buttons-wrapper'
import ButtonGradient from '@/src/components/antd/button-gradient'
import { SummaryItem } from '@/src/components/custom/summary'
import { Tab, Tabs, TokenAmount } from '@/src/components/custom'
import { Balance } from '@/src/components/custom/balance'
import { Form } from '@/src/components/antd'
import { contracts } from '@/src/constants/contracts'
import FiatIcon from '@/src/resources/svg/fiat-icon.svg'
import { DEFAULT_HEALTH_FACTOR } from '@/src/constants/healthFactor'
import { useFIATBalance } from '@/src/hooks/useFIATBalance'
import SuccessAnimation from '@/src/resources/animations/success-animation.json'
import { ZERO_BIG_NUMBER } from '@/src/constants/misc'

const FIAT_KEYS = ['burn', 'mint'] as const
type FiatTabKey = typeof FIAT_KEYS[number]

export const isFiatTab = (key: string): key is FiatTabKey => {
  return FIAT_KEYS.includes(key as FiatTabKey)
}

const COLLATERAL_KEYS = ['deposit', 'withdraw'] as const
type CollateralTabKey = typeof COLLATERAL_KEYS[number]

export const isCollateralTab = (key: string): key is CollateralTabKey => {
  return COLLATERAL_KEYS.includes(key as CollateralTabKey)
}

export type PositionManageFormFields = {
  burn: BigNumber
  withdraw: BigNumber
  mint: BigNumber
  deposit: BigNumber
}

const PositionManage = () => {
  const [form] = AntdForm.useForm<PositionManageFormFields>()
  const [activeSection, setActiveSection] = useState<'collateral' | 'fiat'>('collateral')
  const [activeTabKey, setActiveTabKey] = useState<FiatTabKey | CollateralTabKey>('deposit')
  // @TODO: useFIATBalance hook can't be moved into another hook it trigger infinite updates
  const [fiatBalance, refetchFiatBalance] = useFIATBalance(true)
  const { position, refetch: refetchPosition } = useManagePositionInfo()

  useEffect(() => {
    setActiveTabKey(() => (activeSection === 'collateral' ? 'deposit' : 'mint'))
  }, [activeSection])

  useDynamicTitle(`Manage Position`)

  const infoBlocks = useManagePositionsInfoBlock(position as Position)
  const formValues = form.getFieldsValue(true) as PositionManageFormFields

  const onSuccess = async () => {
    form.resetFields()
    await Promise.all([refetchPosition(), refetchFiatBalance()])
  }

  const {
    availableDepositAmount,
    availableWithdrawAmount,
    buttonText,
    finished,
    handleFormChange,
    handleManage,
    healthFactor,
    isDisabledCreatePosition,
    isLoading,
    maxBorrowAmount,
    maxDepositAmount,
    maxRepayAmount,
    maxWithdrawAmount,
    setFinished,
  } = useManagePositionForm(position as Position, formValues, onSuccess)

  const summary = useManageFormSummary(position as Position, formValues)
  const healthFactorToRender = isValidHealthFactor(healthFactor)
    ? healthFactor?.toFixed(3)
    : DEFAULT_HEALTH_FACTOR

  const maxRepay = BigNumber.min(maxRepayAmount ?? ZERO_BIG_NUMBER, fiatBalance)

  const reset = async () => {
    setFinished(false)
  }

  return (
    <>
      <ButtonBack href="/your-positions">Back</ButtonBack>

      <PositionFormsLayout infoBlocks={infoBlocks}>
        {!finished ? (
          <>
            <div className={cn(s.top)}>
              <RadioTabsWrapper>
                <RadioTab
                  checked={activeSection === 'collateral'}
                  onClick={() => setActiveSection('collateral')}
                >
                  Collateral
                </RadioTab>
                <RadioTab
                  checked={activeSection === 'fiat'}
                  onClick={() => setActiveSection('fiat')}
                >
                  FIAT
                </RadioTab>
              </RadioTabsWrapper>
            </div>

            <Form form={form} onValuesChange={handleFormChange}>
              <fieldset>
                <div className={cn(s.component)}>
                  {'collateral' === activeSection && isCollateralTab(activeTabKey) && (
                    <>
                      <Tabs className={cn(s.tabs)}>
                        <Tab
                          isActive={'deposit' === activeTabKey}
                          onClick={() => {
                            form.setFieldsValue({ withdraw: undefined })
                            setActiveTabKey('deposit')
                          }}
                        >
                          Deposit
                        </Tab>
                        <Tab
                          isActive={'withdraw' === activeTabKey}
                          onClick={() => {
                            form.setFieldsValue({ deposit: undefined })
                            setActiveTabKey('withdraw')
                          }}
                        >
                          Withdraw
                        </Tab>
                      </Tabs>
                      {'deposit' === activeTabKey && position && (
                        <>
                          <Balance
                            title="Select amount to deposit"
                            value={`Available: ${availableDepositAmount?.toFixed(4)}`}
                          />
                          <Form.Item name="deposit" required>
                            <TokenAmount
                              displayDecimals={4}
                              healthFactorValue={healthFactorToRender}
                              mainAsset={position.vaultName}
                              max={maxDepositAmount}
                              maximumFractionDigits={6}
                              secondaryAsset={position.underlier.symbol}
                              slider={'healthFactorVariantReverse'}
                            />
                          </Form.Item>
                        </>
                      )}
                      {'withdraw' === activeTabKey && position && (
                        <>
                          <Balance
                            title="Select amount to withdraw"
                            value={`Available: ${availableWithdrawAmount?.toFixed(4)}`}
                          />
                          <Form.Item name="withdraw" required>
                            <TokenAmount
                              displayDecimals={4}
                              healthFactorValue={healthFactorToRender}
                              mainAsset={position.vaultName}
                              max={maxWithdrawAmount}
                              maximumFractionDigits={6}
                              secondaryAsset={position.underlier.symbol}
                              slider={'healthFactorVariant'}
                            />
                          </Form.Item>
                        </>
                      )}
                    </>
                  )}

                  {'fiat' === activeSection && isFiatTab(activeTabKey) && (
                    <>
                      <Tabs className={cn(s.tabs)}>
                        <Tab
                          isActive={'mint' === activeTabKey}
                          onClick={() => {
                            form.setFieldsValue({ burn: undefined })
                            setActiveTabKey('mint')
                          }}
                        >
                          Borrow
                        </Tab>
                        <Tab
                          isActive={'burn' === activeTabKey}
                          onClick={() => {
                            form.setFieldsValue({ mint: undefined })
                            setActiveTabKey('burn')
                          }}
                        >
                          Repay
                        </Tab>
                      </Tabs>
                      {'mint' === activeTabKey && position && (
                        <>
                          <Balance
                            title="Select amount to borrow"
                            value={`Available: ${fiatBalance?.toFixed(4)}`}
                          />
                          <Form.Item name="mint" required>
                            <TokenAmount
                              displayDecimals={contracts.FIAT.decimals}
                              healthFactorValue={healthFactorToRender}
                              max={maxBorrowAmount}
                              maximumFractionDigits={contracts.FIAT.decimals}
                              slider={'healthFactorVariant'}
                              tokenIcon={<FiatIcon />}
                            />
                          </Form.Item>
                        </>
                      )}
                      {'burn' === activeTabKey && position && (
                        <>
                          <Balance
                            title="Select amount to repay"
                            value={`Available: ${fiatBalance?.toFixed(4)}`}
                          />
                          <Form.Item name="burn" required>
                            <TokenAmount
                              displayDecimals={contracts.FIAT.decimals}
                              healthFactorValue={healthFactorToRender}
                              max={maxRepay}
                              maximumFractionDigits={contracts.FIAT.decimals}
                              slider={'healthFactorVariantReverse'}
                              tokenIcon={<FiatIcon />}
                            />
                          </Form.Item>
                        </>
                      )}
                    </>
                  )}

                  <ButtonsWrapper>
                    <ButtonGradient
                      disabled={isDisabledCreatePosition}
                      height="lg"
                      loading={isLoading}
                      onClick={() => handleManage(formValues)}
                    >
                      {buttonText}
                    </ButtonGradient>
                  </ButtonsWrapper>
                  <div className={cn(s.summary)}>
                    {summary.map((item, index) => (
                      <SummaryItem
                        key={index}
                        state={item?.state}
                        title={item.title}
                        value={item.value}
                      />
                    ))}
                  </div>
                </div>
              </fieldset>
            </Form>
          </>
        ) : (
          <div className={cn(s.form)}>
            <div className={cn(s.lastStepAnimation)}>
              <Lottie animationData={SuccessAnimation} autoplay loop />
            </div>
            <h1 className={cn(s.lastStepTitle)}>Congrats!</h1>
            <p className={cn(s.lastStepText)}>Your position has been successfully updated.</p>
            <div className={cn(s.summary)}>
              <ButtonsWrapper>
                <ButtonGradient height="lg" onClick={reset}>
                  Continue
                </ButtonGradient>
                <Link href={`/your-positions/`} passHref>
                  <button className={cn(s.finishButton)}>Go to Your Positions</button>
                </Link>
              </ButtonsWrapper>
            </div>
          </div>
        )}
      </PositionFormsLayout>
    </>
  )
}

export default withRequiredConnection(PositionManage)
