import React, { Component } from 'react'
import { AccountData, ContractData, ContractForm } from 'drizzle-react-components'
import IPFSImageFromContractData from '../../components/IPFSImageFromContractData'
import BloomRequest from './BloomRequest.js'

class Sign extends Component {
  constructor(props, context) {
    super(props);

    var contract = context.drizzle.contracts["BlocUSign"];
    this.documentStateKey = contract.methods["documentState"].cacheCall(props.documentId);

    this.handleSign = this.handleSign.bind(this);

    this.state = { contract, documentState: false, submitted: false }
  }

  
  componentDidMount() {
    React.socket.on('bloom_payload', (payload) => {
      console.log('payload', payload);
      // this.setState({
      //   createDocumentArgs: {
      //     ...this.state.createDocumentArgs,
      //     _signatory
      //   }
      // })
    })
  }

  handleSign() {
    this.state.contract.methods["sign"].cacheSend(this.props.documentId);
    this.setState({submitted: true})
  }

  render() {
    const documentState = this.props.BlocUSign["documentState"].hasOwnProperty(this.documentStateKey) && this.props.BlocUSign["documentState"][this.documentStateKey].value == "1" ? true : false;
    const loadingClassName = documentState ? "circle-loader load-complete" : "circle-loader"
    const checkmarkClassName = documentState ? "checkmark draw checkmark-complete" : "checkmark draw"

    console.log(documentState)

    const button = documentState ? (
      <button className="button-xlarge pure-button pure-button-primary sign-button" disabled>
        <i className="fa fa-file-contract fa-lg"></i> Signing Complete
      </button>
    ) : (
      <button className="button-xlarge pure-button pure-button-primary sign-button" onClick={this.handleSign} disabled={this.state.submitted}>
        <i className="fa fa-file-contract fa-lg"></i> Sign Document
      </button>
    );

    const checkmark = documentState || this.state.submitted ? (
      <div className="pure-u-1-1 checkmarkstate">
        <div className={loadingClassName}>
          <div className={checkmarkClassName}></div>
        </div>
      </div>
    ) : undefined;

    return (
      <div className="pure-u-1-1 sub-container">
        <div className="pure-u-2-5">
          <div className="sub-container-sub">
            <IPFSImageFromContractData hideIndicator={true} contract="BlocUSign" method="documentData" methodArgs={this.props.documentId} /> 
          </div>
        </div>
        <div className="pure-u-3-5">
          <div className="sub-container-sub">
            <h2>Your Signature is Required</h2>
            <p>
              BlocuSign is a decentralized document signing platform. Your signature has been requested.
            </p>
            
            <p><code><ContractData hideIndicator={true} contract="BlocUSign" method="documentRequester" methodArgs={this.props.documentId} /></code>
            is requesting your authorization from <code><ContractData hideIndicator={true} contract="BlocUSign" method="documentSignatory" methodArgs={this.props.documentId} /></code> for the document located at <code><ContractData hideIndicator={true} contract="BlocUSign" method="documentData" methodArgs={this.props.documentId} /></code></p> 

            {checkmark}
            <BloomRequest/>
            {button}
          </div>
        </div>
      </div>
    )
  }
}

export default Sign
