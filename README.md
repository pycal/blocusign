# Blocusign

Install ganache-cli
Install truffle

```
ganache-cli -b 3
ipfs config --json API.HTTPHeaders.Access-Control-Allow-Origin '["*"]'
yarn install
truffle compile
truffle migrate
yarn start
```