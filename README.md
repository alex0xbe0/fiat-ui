# FIAT UI
Get leverage and access secondary liquidity for your favorite DeFi fixed income assets.

## Getting Started Instructions
1. Clone the project:
    ```sh
    git clone git@github.com:fiatdao/fiat-ui.git
    ```

1. Create a `.env.local` file:
    ```sh
    cp .env.example .env.local
    ```
    Make sure to populate it with your own api keys

1. Install Node dependencies:
    ```sh
    yarn
    ```

1. Install the latest release of Ganache from [here](https://github.com/trufflesuite/ganache-ui/releases) and it to your path. Ensure it's installed by running `ganache --version`.

1. Run a local testnet with
    ```sh 
    yarn run testnet
    ```

1. Add the first ganache user to your wallet <TODO>

1. In another terminal, run the frontend with
    ```sh
    yarn dev
    ```

## How to Contribute
To contribute, start by grabbing one of the open issues on the repo, and assigning it to yourself. Once the task has been completed, open a PR against the `main` branch.

## Helpful Testnet Links
- Goerli USDC Faucet: https://goerli.etherscan.io/address/0x08034634bbd210485c9c8f798afdc5432782fd18#writeContract
- Element.fi: https://testnet.element.fi/mint
- Notional.finance: https://goerli.notional.finance/lend/DAI

