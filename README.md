# BlocuSign

## Description

BlocUsign is the easy way to sign documents using your digital identity. [BloomID](https://bloom.co/identity) is used to prove the personal information of the signer is verified without exposing underlying data.

## Running BlocuSign locally

### Prerequisites

* ganache-cli
* truffle
* node
* yarn
* ipfs
* ngrok

### Installation

1. Install dependencies: `yarn install`. Ignore error related to fauilure during minimisation process; optimized build is not really needed at this stage.
2. Run private blockchain: `ganache-cli -b 3`.
3. Compile smart contracts: `truffle compile`.
4. Migrate smart contracts to Ganache: `truffle migrate`.

### Runnning the dapp

1. Allow CORS on local ipfs node: `ipfs config --json API.HTTPHeaders.Access-Control-Allow-Origin '["*"]'`.
2. Start Node server (on port 3000 by default) that acts local BloomID verifier endpoint: `yarn start-server`.
3. Expose Node server: `ngrok http 3000`.
4. Insert ngrok https forwarding address into `RequestData` object (under `url` key) in `src/layouts/sign/BloomRequest.js` component. It should now look similar to the following: `url: 'https://e3640e09.ngrok.io/bloom_payload',`
5. Start the dapp (on port 3001): `yarn start`.