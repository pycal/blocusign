import Sign from './Sign'
import { drizzleConnect } from 'drizzle-react'
import PropTypes from 'prop-types'

// May still need this even with data function to refresh component on updates for this contract.
const mapStateToProps = (state, ownProps) => {
  return {
    accounts: state.accounts,
    BlocUSign: state.contracts.BlocUSign,
    drizzleStatus: state.drizzleStatus,
    documentId: ownProps.match.params.document_id
  }
}

Sign.contextTypes = {
  drizzle: PropTypes.object
}

const SignContainer = drizzleConnect(Sign, mapStateToProps);

export default SignContainer;
