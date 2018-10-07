import BlocUSign from './../build/contracts/BlocUSign.json'

const drizzleOptions = {
  web3: {
    block: false,
    fallback: {
      type: 'ws',
      url: 'ws://127.0.0.1:8545'
    }
  },
  contracts: [
    BlocUSign
  ],
  events: {
    BlocUSign: ['DocumentCreated', 'DocumentSigned']
  },
  polls: {
    accounts: 1500
  }
}

export default drizzleOptions