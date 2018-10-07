import Create from './Create'
import { drizzleConnect } from 'drizzle-react'
import PropTypes from 'prop-types'

// May still need this even with data function to refresh component on updates for this contract.
const mapStateToProps = state => {
  return {
    accounts: state.accounts,
    BlocUSign: state.contracts.BlocUSign,
    drizzleStatus: state.drizzleStatus
  }
}

Create.contextTypes = {
  drizzle: PropTypes.object
}

const CreateContainer = drizzleConnect(Create, mapStateToProps);

export default CreateContainer;
