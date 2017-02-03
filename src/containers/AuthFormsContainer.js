import { connect } from 'react-redux'
import {authFormAlertDismiss} from '../actions/authForms'
import {AuthForms} from '../components/AuthForms'



const mapStateToProps = (state, ownProps) => {
  return {
    alertMessage: state.authForms.get('alertMessage'),
    alertVisible: state.authForms.get('alertVisible'),
    alertStyle: state.authForms.get('alertStyle')

  }
}


const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    handleAlertDismiss: () => {dispatch(authFormAlertDismiss())},
  }
}



export const AuthFormsContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(AuthForms)






