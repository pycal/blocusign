import React, { Component } from 'react'
import { ContractData  } from 'drizzle-react-components'

class IPFSImageFromContractData extends ContractData {
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

        var displayData = this.props.contracts[this.props.contract][this.props.method][this.dataKey].value

        return(
        <span>
            {pendingSpinner}
        </span>
        )
    }
}

export default IPFSImageFromContractData
