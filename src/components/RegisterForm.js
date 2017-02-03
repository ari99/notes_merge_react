import React, { PropTypes } from 'react'
//import Recaptcha from 'react-recaptcha';
import { Row, Col, FormGroup, FormControl } from 'react-bootstrap';
import {RegisterButton} from '../containers/RegisterButton'
import {RECAPTCHA_SITE_KEY} from '../utils/config'
var Recaptcha = require('react-recaptcha');

export const RegisterForm = ({registerUsernameValue, registerPasswordValue, registerUsernameOnChange,
  registerPasswordOnChange, recaptchaVerifyCallback, recaptchaOnloadCallback}) => {

  return (
    <form id="register-form" action="#" method="post" role="form" style={{display: 'block'}}>
      <FormGroup controlId="username">
        <FormControl type="text" tabIndex="3" value={registerUsernameValue} onChange={registerUsernameOnChange} placeholder="Username" />
      </FormGroup>
      <FormGroup controlId="password">
        <FormControl type="password" tabIndex="4" value={registerPasswordValue} onChange={registerPasswordOnChange} placeholder="Password" />
      </FormGroup>
      <FormGroup controlId="recaptcha-holder">
        <Recaptcha
          sitekey={RECAPTCHA_SITE_KEY}
          onloadCallback={recaptchaOnloadCallback}
          verifyCallback={recaptchaVerifyCallback}
          render="explicit"
        />
      </FormGroup>
      <FormGroup controlId="register-submit">
        <Row>
          <Col sm={6} smOffset={3}>
            <RegisterButton>Register</RegisterButton>
          </Col>
        </Row>
      </FormGroup>
    </form>

  )
}

RegisterForm.propTypes = {

  registerUsernameValue: PropTypes.string.isRequired,
  registerPasswordValue: PropTypes.string.isRequired,
  registerUsernameOnChange: PropTypes.func.isRequired,
  registerPasswordOnChange: PropTypes.func.isRequired,
  recaptchaVerifyCallback: PropTypes.func.isRequired,
  recaptchaOnloadCallback: PropTypes.func.isRequired,

}