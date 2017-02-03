import { connect } from 'react-redux'
import {OnClickButton} from '../components/OnClickButton'
import { authLoginFetch } from '../actions/authLogin'

const mapStateToProps = (state, ownProps) => {
  return {
    username: state.authForms.get('login').get('username'),
    password: state.authForms.get('login').get('password')

  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onClick: () => {
      dispatch(authLoginFetch())
    }
  }
}

export const LoginButton = connect(
    mapStateToProps,
    mapDispatchToProps
)(OnClickButton)

