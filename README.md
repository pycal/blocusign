# BlocuSign

## Description

DocuSign is a digital document signature and notarization service which fundamentally relies on trust. it is costly, complicated, and centralized! Digital Document signatures is a $1B business: [https://twitter.com/balajis/status/1048796098804908033](https://twitter.com/balajis/status/1048796098804908033)

blocusign is a simple decentralized merkle-proven identity-attested non-fungible immutable cryptographically-signed interplanetarily-archived digital-notarization-and-document-signature-as-a-service protocol on the blockchain!

Two parties: Alice wants Bob to sign a document

Alice creates a Document by uploading a document to IPFS with our dApp. The dApp creates a NFT with the cryptographic hash of the document, a signature state (currently unsigned), Bob's address (now only Bob could possibly sign this document), and Alice's address (Bob can prove Alice issued the Document).

Alice now gets a link which she can send Bob. Bob can review the document, and at his leisure, sign the Document.

When Bob is ready, he can sign the Document, which timestamps it by merit of the block height, and associates his consent for this immutable document on chain.

BlocUsign also allows to sign documents using your digital identity. [BloomID](https://bloom.co/identity) is used to prove the personal information of the signer is verified without exposing underlying data.

DocuSign was created during ETHSanFrancisco hackathon on October 5-7, 2018. Check out our [Devpost submission](https://devpost.com/software/blocusign) for more details.

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

## License

MIT License

Copyright (c) 2018 Cailen McQuattie
