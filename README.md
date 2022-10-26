IMX market trader backend built with Nest.js framework

## Description

Make buy and sell limit orders for NFT assets on IMX market.

For buy limit orders, NFTs will be bought whenever the price is below the set price level. This is very advantageous as NFT markets typically do not have order books.

For sell limit orders, undercutting will be done as long as the price is above the set price level. The price will be raised automatically if there are no other sell orders near the set price.

Note: Some core functionalities in the trade queue processing have been removed

## Dependencies

- MongoDB Server is required
- Redis Server is required

Install these dependencies or run `docker-compose up` to fulfil these dependencies

## Installation

```bash
$ yarn install
```

## Running the app

```bash
# testnet
$ yarn start:testnet

# mainnet
$ yarn start:mainnet
```
