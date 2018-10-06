import React, { Component } from 'react'
import { AccountData, ContractData, ContractForm } from 'drizzle-react-components'

class Create extends Component {
  render() {
    return (
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1-1 header">
            <h1>BlocUSign</h1>

            <br/><br/>
          </div>

          <div className="pure-u-1-1">
            <h2>Active Account</h2>
            <AccountData accountIndex="0" units="ether" precision="3" />

            <br/><br/>
          </div>

          <div className="pure-u-1-1">
            <ContractData contract="BlocUSign" method="symbol" />
            <ContractData contract="BlocUSign" method="name" />

            <ContractForm contract="BlocUSign" method="createDocument" />
            <ContractForm contract="BlocUSign" method="sign" />
          </div>
        </div>
      </main>
    )
  }
}

export default Create
