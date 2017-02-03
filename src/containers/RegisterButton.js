import { connect } from 'react-redux'
import {OnClickButton} from '../components/OnClickButton'
import { fetchAuthRegisterIfVerified } from '../actions/authRegister'


const mapStateToProps = (state, ownProps) => {
  return {
    username: state.authForms.get('register').get('username'),
    password: state.authForms.get('register').get('password'),
  }
}



const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onClick: () => {
         dispatch(fetchAuthRegisterIfVerified())
    }
  }
}

export const RegisterButton = connect(
  mapStateToProps,
  mapDispatchToProps
)(OnClickButton)

