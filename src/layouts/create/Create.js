import React, { Component } from 'react'
import Upload from './Upload'
import SignContract from '../../components/SignContract'
import { AccountData, ContractData } from 'drizzle-react-components'
import CustomContractForm from '../../components/CustomContractForm'

class Create extends Component {
  constructor(props, context) {
    super(props);
    this.onUpload = this.onUpload.bind(this);

    var contract = context.drizzle.contracts["BlocUSign"];
    this.totalSupplyKey = contract.methods["totalSupply"].cacheCall();

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

    const totalSupply = this.props.BlocUSign["totalSupply"].hasOwnProperty(this.totalSupplyKey) ? this.props.BlocUSign["totalSupply"][this.totalSupplyKey].value : undefined;

    return (
      <div className="pure-u-1-1 sub-container">
        <div className="pure-u-2-5">
          <div className="sub-container-sub">
            <h2>Upload Document</h2>
            <Upload onUpload={this.onUpload}/>
          </div>
        </div>

        <div className="pure-u-3-5">
          <div className="sub-container-sub">
            <p>
              Blocusign is a decentralized document signing service. Upload a document, and choose an addressee you'd like to sign the document.
            </p>
            <SignContract/>
            <CustomContractForm totalSupply={totalSupply} contract="BlocUSign" method="createDocument" labels={["Signatory address", "IPFS document hash"]} methodArgs={{"_data": this.state.added_file_hash}}/>
          </div>
        </div>
      </div>
    )
  }
}

export default Create
