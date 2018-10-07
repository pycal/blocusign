import { drizzleConnect } from 'drizzle-react'
import React, { Component } from 'react'
import PropTypes from 'prop-types'

/*
 * Create component.
 */

class CustomContractForm extends Component {
  constructor(props, context) {
    super(props);

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.contracts = context.drizzle.contracts;

    // Get the contract ABI
    const abi = this.contracts[this.props.contract].abi;

    this.inputs = [];
    console.log('props: ', this.props)
    var initialState = { submitted: false };

    // Iterate over abi for correct function.
    for (var i = 0; i < abi.length; i++) {
        if (abi[i].name === this.props.method) {
            this.inputs = abi[i].inputs;

            for (var i = 0; i < this.inputs.length; i++) {
                initialState[this.inputs[i].name] = (this.props.methodArgs && this.props.methodArgs[this.inputs[i].name] )|| '';
            }

            break;
        }
    }

    this.totalSupplyKey = this.contracts[this.props.contract].methods["totalSupply"].cacheCall();

    this.state = initialState;
  }

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.methodArgs !== prevProps.methodArgs) {
      this.setState({...this.props.methodArgs})
    }

    if (this.state.submitted && this.props.totalSupply !== prevProps.totalSupply) {
      this.setState({ newLink: `http://localhost:3000/${this.props.totalSupply}` })
    }
  }

  handleSubmit() {
    if (this.props.sendArgs) {
      return this.contracts[this.props.contract].methods[this.props.method].cacheSend(...Object.values({ _signatory: this.state._signatory, _data: this.state._data }), this.props.sendArgs);
    }

    this.contracts[this.props.contract].methods[this.props.method].cacheSend(...Object.values({ _signatory: this.state._signatory, _data: this.state._data }));

    this.setState({ submitted: true })
  }

  handleInputChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  translateType(type) {
    switch(true) {
        case /^uint/.test(type):
            return 'number'
            break
        case /^string/.test(type) || /^bytes/.test(type):
            return 'text'
            break
        case /^bool/.test(type):
            return 'checkbox'
            break
        default:
            return 'text'
    }
  }

  render() {
    const circleClassName = this.state.newLink ? "circle-loader load-complete" : "circle-loader";
    const chechmarkClassName = this.state.newLink ? "checkmark draw checkmark-complete" : "checkmark draw";

    const checkmark = (
      <div className="pure-u-1-1 checkmarkstate">
        <div className={circleClassName}>
          <div className={chechmarkClassName}></div>
        </div>
        {this.state.newLink ? (
          <div>
            <br/><br/>
            <label>Document NFT available for signatory</label>
            <input type="text" value={this.state.newLink} />
          </div>
        ) : undefined}
      </div>
    );

    return (
      <form className="pure-form pure-form-stacked">
        {this.inputs.map((input, index) => {            
            var inputType = this.translateType(input.type)
            var inputLabel = this.props.labels ? this.props.labels[index] : input.name
            // check if input type is struct and if so loop out struct fields as well
            return (<input key={input.name} type={inputType} name={input.name} value={this.state[input.name]} placeholder={inputLabel} onChange={this.handleInputChange} disabled={this.state.submitted} />)
        })}
        {this.state.submitted ? checkmark : undefined}

        <button key="submit" className="button-xlarge pure-button pure-button-primary sign-button" type="button" onClick={this.handleSubmit} disabled={this.state.submitted} >
          <i className="fa fa-arrow-alt-circle-right fa-lg"></i> Create BlocuSign NFT Document
        </button>
      </form>
    )
  }
}

CustomContractForm.contextTypes = {
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

export default drizzleConnect(CustomContractForm, mapStateToProps)