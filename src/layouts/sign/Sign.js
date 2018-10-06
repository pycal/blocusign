import React, { Component } from 'react'
import { AccountData, ContractData, ContractForm } from 'drizzle-react-components'

class Sign extends Component {
  render() {
    return (
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1-1 header">
            <h1>Sign Doc: {this.props.document_id}</h1>

            <br/><br/>
          </div>

          <div className="pure-u-1-1">
            <ContractData contract="BlocUSign" method="documentIdToDocument" methodArgs={this.props.document_id} />
          </div>
        </div>
      </main>
    )
  }
}

export default Sign
