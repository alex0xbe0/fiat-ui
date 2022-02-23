import s from './s.module.scss'
import cn from 'classnames'
import { useEffect, useState } from 'react'
import withRequiredConnection from '@/src/hooks/RequiredConnection'
import { useDynamicTitle } from '@/src/hooks/useDynamicTitle'
import {
  ManageFiat,
  ManageFiatProps,
  isFiatTab,
} from '@/src/components/custom/manage-position/ManageFiat'
import {
  ManageCollateral,
  ManageCollateralProps,
  isCollateralTab,
} from '@/src/components/custom/manage-position/ManageCollateral'
import { PositionFormsLayout } from '@/src/components/custom/position-forms-layout'
import { ButtonBack } from '@/src/components/custom/button-back'
import { RadioTab, RadioTabsWrapper } from '@/src/components/antd/radio-tab'

const PositionManager = () => {
  const [activeSection, setActiveSection] = useState<'collateral' | 'fiat'>('collateral')
  const [activeTabKey, setActiveTabKey] = useState<
    ManageCollateralProps['activeTabKey'] | ManageFiatProps['activeTabKey']
  >('deposit')

  // Todo add tokenSymbol here
  useDynamicTitle(`Manage position`)

  useEffect(() => {
    setActiveTabKey(() => (activeSection === 'collateral' ? 'deposit' : 'mint'))
  }, [activeSection])

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
      <ButtonBack href="/your-positions">Back</ButtonBack>
      <PositionFormsLayout
        form={
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
            {'collateral' === activeSection && isCollateralTab(activeTabKey) && (
              <ManageCollateral activeTabKey={activeTabKey} setActiveTabKey={setActiveTabKey} />
            )}
            {'fiat' === activeSection && isFiatTab(activeTabKey) && (
              <ManageFiat activeTabKey={activeTabKey} setActiveTabKey={setActiveTabKey} />
            )}
          </>
        }
        infoBlocks={mockedBlocks}
      />
    </>
  )
}

export default withRequiredConnection(PositionManager)
