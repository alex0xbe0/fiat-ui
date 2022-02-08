import BigNumber from 'bignumber.js'
import { assign, createMachine } from 'xstate'
import { getNonHumanValue } from '@/src/web3/utils'
import { contracts } from '@/src/constants/contracts'

const VAULT_ADDRESS = '0xeCdB7DC331a8b5117eCF548Fa4730b0dAe76077D'

export const TITLES_BY_STEP: { [key: number]: { title: string; subtitle: string } } = {
  1: {
    title: 'Configure your position',
    subtitle: 'Select which asset to deposit and how much FIAT to mint.',
  },
  2: {
    title: 'Create a Proxy contract',
    subtitle: 'The Proxy Contract will allow you to interact with the FIAT protocol...',
  },
  3: {
    title: 'Set Collateral Allowance',
    subtitle: 'Give permission to the FIAT protocol to manager your Collateral',
  },
  4: {
    title: 'Set Collateral Allowance',
    subtitle: 'Give permission to the FIAT protocol to manager your Collateral',
  },
  5: {
    title: 'Confirm your new position',
    subtitle: 'Review and verify the details of your new position',
  },
}

interface Context {
  erc20Amount: BigNumber
  fiatAmount: BigNumber
  currentStepNumber: number
  totalStepNumber: number
  tokenSymbol: string
  tokenAddress: string
  hasAllowance: boolean
  isProxyAvailable: boolean
  loading: boolean
  loadingType: string
}

type Events =
  | { type: 'SET_HAS_ALLOWANCE'; hasAllowance: boolean }
  | { type: 'SET_CURRENT_STEP_NUMBER'; currentStepNumber: number }
  | { type: 'SET_ERC20_AMOUNT'; erc20Amount: BigNumber }
  | { type: 'SET_FIAT_AMOUNT'; fiatAmount: BigNumber }
  | { type: 'SET_LOADING'; isLoading: boolean }
  | { type: 'CLICK_SETUP_PROXY' }
  | { type: 'CLICK_ALLOW' }
  | { type: 'CLICK_DEPLOY' }
  | { type: 'CONFIRM' }
  | { type: 'CONFIRMED' }
  | { type: 'FAILED' }
  | { type: 'POSITION_CREATED_SUCCESS' }
  | { type: 'POSITION_CREATED_ERROR' }
  | { type: 'USER_REJECTED' }

const stepperMachine = createMachine<Context, Events>(
  {
    id: 'stepper',
    initial: 'step-1-enteringERC20Amount',
    // Globals machine events
    context: {
      erc20Amount: BigNumber.ZERO,
      fiatAmount: BigNumber.ZERO,
      currentStepNumber: 1,
      totalStepNumber: 5,
      tokenSymbol: '',
      tokenAddress: '',
      hasAllowance: false,
      isProxyAvailable: false,
      loading: false,
      loadingType: '',
    },
    on: {
      SET_HAS_ALLOWANCE: {
        actions: 'setAllowance',
        target: 'step-1-enteringERC20Amount',
      },
      SET_CURRENT_STEP_NUMBER: {
        actions: ['setCurrentStepNumber'],
      },
      SET_ERC20_AMOUNT: { actions: 'setERC20Amount' },
      SET_FIAT_AMOUNT: { actions: 'setFiatAmount' },
      SET_LOADING: { actions: 'setLoading' },
    },
    states: {
      'step-1-enteringERC20Amount': {
        always: [
          {
            target: 'step-4-enteringFIATAmount',
            cond: (ctx) => ctx.hasAllowance && ctx.isProxyAvailable && ctx.erc20Amount.gt(0),
          },
        ],
        entry: [assign({ currentStepNumber: (_) => 1 })],
        on: {
          CLICK_SETUP_PROXY: 'step-2-setupProxy',
          CLICK_ALLOW: 'step-3-approveAllowance',
        },
      },
      'step-2-setupProxy': {
        entry: [assign({ currentStepNumber: (_) => 2 })],
      },
      'step-3-approveAllowance': {
        entry: [assign({ currentStepNumber: (_) => 3 })],
      },
      'step-4-enteringFIATAmount': {
        entry: [assign({ currentStepNumber: (_) => 4 })],
        always: {
          target: 'step-1-enteringERC20Amount',
          cond: (ctx) => !ctx.erc20Amount.gt(0),
        },
        on: {
          CLICK_DEPLOY: [{ target: 'step-5-addCollateral' }],
        },
      },
      'step-5-addCollateral': {
        entry: [assign({ currentStepNumber: (_) => 5 })],
        on: {
          CONFIRM: 'confirming-position',
        },
      },
      'confirming-position': {
        invoke: {
          src: 'submitForm',
        },
        on: {
          POSITION_CREATED_SUCCESS: {
            target: 'step-final-congrats',
          },
          POSITION_CREATED_ERROR: {
            target: 'step-final-error',
          },
          USER_REJECTED: {
            // @ts-ignore TODO types
            actions: assign({ error: (_) => 'User rejected transaction' }),
            target: 'step-5-addCollateral',
          },
        },
      },
      'step-final-congrats': {},
      'step-final-error': {},
    },
  },
  {
    // Global machine actions (using in events)
    actions: {
      setAllowance: assign<Context, any>((ctx, { hasAllowance }) => ({
        hasAllowance,
      })),
      setERC20Amount: assign<Context, any>((_ctx, { erc20Amount }) => ({
        erc20Amount,
      })),
      setFiatAmount: assign<Context, any>((_ctx, { fiatAmount }) => ({
        fiatAmount,
      })),
      setCurrentStepNumber: assign<Context, any>((_ctx, { currentStepNumber }) => ({
        currentStepNumber,
      })),
      setLoading: assign<Context, any>((_ctx, { loading, loadingType }) => ({
        loading,
        loadingType,
      })),
    },
    services: {
      submitForm:
        (
          { erc20Amount, fiatAmount, tokenAddress },
          // TODO: types
          {
            // @ts-ignore
            currentUserAddress,
            // @ts-ignore
            isAppConnected,
            // @ts-ignore
            refetchErc20Balance,
            // @ts-ignore
            userActions,
            // @ts-ignore
            userProxy,
            // @ts-ignore
            web3Provider,
          },
        ) =>
        (callback: any) => {
          console.log(event)
          if (isAppConnected && web3Provider && currentUserAddress) {
            try {
              // FixMe: Hardcoded decimals
              const _erc20Amount = getNonHumanValue(erc20Amount, 18)
              const _fiatAmount = getNonHumanValue(fiatAmount, contracts.FIAT.decimals)

              const encodedFunctionData = userActions.interface.encodeFunctionData(
                'modifyCollateralAndDebt',
                [
                  VAULT_ADDRESS,
                  tokenAddress,
                  currentUserAddress,
                  currentUserAddress,
                  _erc20Amount.toFixed(),
                  _fiatAmount.toFixed(),
                ],
              )

              userProxy
                ?.execute(userActions.address, encodedFunctionData, {
                  gasLimit: 10_000_000,
                })
                .then((tx: any) => tx.wait())
                .then((receipt: any) => {
                  console.log({ receipt })
                  refetchErc20Balance()
                  callback('POSITION_CREATED_SUCCESS')
                  console.log('Position created!')
                })
                .catch((e: any) => {
                  if (e.code === 4001) {
                    callback('USER_REJECTED')
                  } else {
                    callback('POSITION_CREATED_ERROR')
                  }
                })
            } catch (e) {
              callback('POSITION_CREATED_ERROR')
            }
          }
        },
    },
  },
)

export default stepperMachine