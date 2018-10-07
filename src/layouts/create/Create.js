import React, { Component } from 'react'
import Upload from './Upload';
import { AccountData, ContractData } from 'drizzle-react-components'
import CustomContractForm from '../../components/CustomContractForm'

class Create extends Component {
  constructor() {
    super();
    this.onUpload = this.onUpload.bind(this);

    this.state = {
      createDocumentArgs: {}
    };

  }

  onUpload(fileHash) {
    console.log('fileHash', fileHash);
    this.setState({added_file_hash: fileHash})
     // href={'https://ipfs.io/ipfs/' + this.state.added_file_hash}>
  }
  render() {
    return (
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1-1 header">
            <h1>BlocUSign</h1>

            <br/><br/>
          </div>

          <div className="pure-u-1-1">
            <h2>Upload Document</h2>
            <Upload onUpload={this.onUpload}/>
            <div>File Hash: {this.state.added_file_hash}</div>
            <br/><br/>
          </div>

          <div className="pure-u-1-1">
            <h2>Active Account</h2>


            <br/><br/>
          </div>

          <div className="pure-u-1-1">
            <ContractData contract="BlocUSign" method="symbol" />
            <ContractData contract="BlocUSign" method="name" />

            <CustomContractForm contract="BlocUSign" method="createDocument" methodArgs={this.state.createDocumentArgs}/>
            <CustomContractForm contract="BlocUSign" method="sign" />
          </div>
        </div>
      </main>
    )
  }
}

export default Create
