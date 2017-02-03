import { connect } from 'react-redux'
import {loginPasswordChange, loginUsernameChange } from '../actions/authForms'
import {LoginForm} from '../components/LoginForm'


const mapStateToProps = (state, ownProps) => {
  return {
    loginUsernameValue: state.authForms.get('login').get('username'),
    loginPasswordValue: state.authForms.get('login').get('password'),
  }
}


const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    loginUsernameOnChange: (e) => {dispatch(loginUsernameChange(e.target.value))},
    loginPasswordOnChange: (e) => {dispatch(loginPasswordChange(e.target.value))},

  }
}


export const LoginFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginForm)


