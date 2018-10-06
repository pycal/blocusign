import { drizzleConnect } from 'drizzle-react'
import React, { Component } from 'react'
import PropTypes from 'prop-types'

/*
 * Create component.
 */

class IPFSImageFromContractData extends Component {
  constructor(props, context) {
    super(props)

    this.contracts = context.drizzle.contracts

    // Get the contract ABI
    const abi = this.contracts[this.props.contract].abi;

    // Fetch initial value from chain and return cache key for reactive updates.
    var methodArgs = this.props.methodArgs ? this.props.methodArgs : []
    this.dataKey = this.contracts[this.props.contract].methods[this.props.method].cacheCall(...methodArgs)
  }

  render() {
    // Contract is not yet intialized.
    if(!this.props.contracts[this.props.contract].initialized) {
      return (
        <span>Initializing...</span>
      )
    }

    // If the cache key we received earlier isn't in the store yet; the initial value is still being fetched.
    if(!(this.dataKey in this.props.contracts[this.props.contract][this.props.method])) {
      return (
        <span>Fetching...</span>
      )
    }

    // Show a loading spinner for future updates.
    var pendingSpinner = this.props.contracts[this.props.contract].synced ? '' : ' 🔄'

    // Optionally hide loading spinner (EX: ERC20 token symbol).
    if (this.props.hideIndicator) {
      pendingSpinner = ''
    }

    var hash = this.props.contracts[this.props.contract][this.props.method][this.dataKey].value

    var URI = `http://127.0.0.1:8080/ipfs/${hash}`

    return(
      <span><img src={URI} />{pendingSpinner}</span>
    )
  }
}

IPFSImageFromContractData.contextTypes = {
  drizzle: PropTypes.object
}

/*
 * Export connected component.
 */

const mapStateToProps = state => {
  return {
    contracts: state.contracts
  }
}

export default drizzleConnect(IPFSImageFromContractData, mapStateToProps)