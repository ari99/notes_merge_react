import { connect } from 'react-redux'
import {registerPasswordChange, registerUsernameChange, recaptchaVerifyResponse } from '../actions/authForms'
import {authRegisterFetch} from '../actions/authRegister'
import {RegisterForm} from '../components/RegisterForm'



const mapStateToProps = (state, ownProps) => {
  return {
    registerUsernameValue: state.authForms.get('register').get('username'),
    registerPasswordValue: state.authForms.get('register').get('password'),
  }
}


const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    registerUsernameOnChange: (e) => {dispatch(registerUsernameChange(e.target.value))},
    registerPasswordOnChange: (e) => {dispatch(registerPasswordChange(e.target.value))},
    registerButtonOnClick: () => {dispatch(authRegisterFetch())},
    recaptchaVerifyCallback: (response) => {dispatch(recaptchaVerifyResponse(response))},
    recaptchaOnloadCallback: (response) => {}

  }
}



export const RegisterFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisterForm)






