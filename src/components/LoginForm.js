import React, { PropTypes } from 'react'
import { Row, Col, FormGroup, FormControl, } from 'react-bootstrap';
import {LoginButton} from '../containers/LoginButton'

export const LoginForm = ({loginUsernameValue, loginPasswordValue, loginUsernameOnChange,
                        loginPasswordOnChange}) => {
  return (
    <form id="login-form" action="#" method="post" role="form" style={{display: 'block'}}>
      <FormGroup controlId="username">
        <FormControl type="text" tabIndex="1" value={loginUsernameValue} onChange={loginUsernameOnChange} placeholder="Username" />
      </FormGroup>
      <FormGroup controlId="password">
        <FormControl type="password" tabIndex="2" value={loginPasswordValue} onChange={loginPasswordOnChange} placeholder="Password" />
      </FormGroup>
      <FormGroup controlId="login-submit">
        <Row>
          <Col sm={6} smOffset={3}>
            <LoginButton>Login</LoginButton>
          </Col>
        </Row>
      </FormGroup>
    </form>
  )
}

LoginForm.propTypes = {

  loginUsernameValue: PropTypes.string.isRequired,
  loginPasswordValue: PropTypes.string.isRequired,
  loginUsernameOnChange: PropTypes.func.isRequired,
  loginPasswordOnChange: PropTypes.func.isRequired,

}
