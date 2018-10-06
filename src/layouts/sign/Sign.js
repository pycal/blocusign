import React, { Component } from 'react'
import { AccountData, ContractData, ContractForm } from 'drizzle-react-components'
import IPFSImageFromContractData from '../../components/IPFSImageFromContractData'

class Sign extends Component {
  render() {
    return (
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1-1 header">
            <h1>Sign Doc: {this.props.documentId}</h1>

            <br/><br/>
          </div>

          <div className="pure-u-1-1">
            <ContractData contract="BlocUSign" method="documentState" methodArgs={this.props.documentId} />
            <br/>
            <ContractData contract="BlocUSign" method="documentRequester" methodArgs={this.props.documentId} />
            <br/>
            <ContractData contract="BlocUSign" method="documentSignatory" methodArgs={this.props.documentId} />
            <br/>
            <IPFSImageFromContractData contract="BlocUSign" method="documentData" methodArgs={this.props.documentId} /> 
            <br/>
            <ContractForm contract="BlocUSign" method="sign" />
          </div>
        </div>
      </main>
    )
  }
}

export default Sign
