import React, { PropTypes } from 'react'
import { Grid, Row, Col, Panel, Alert } from 'react-bootstrap';
import './css/Login.css';
import {LoginFormContainer} from '../containers/LoginFormContainer'
import {RegisterFormContainer} from '../containers/RegisterFormContainer'

/**
* Based on the non-react bootstrap temple, converted to use react-bootstap:
* http://bootsnipp.com/snippets/featured/login-and-register-tabbed-form
*/
export const AuthForms = ({alertMessage, alertVisible, alertStyle, handleAlertDismiss}) => {
  return(
    <Grid>
      <Row>
        <Col md={6} mdOffset={3}>
          <Panel bsClass="panel panel-login">
            {  alertVisible === true &&
              <Col lg={12}>
                <Row>
                  <Alert bsStyle={alertStyle} onDismiss={handleAlertDismiss}><p>{alertMessage}</p></Alert>
                </Row>
              </Col>
            }
            <Row>
              <Col lg={12}>
                <LoginFormContainer />
                <RegisterFormContainer />
              </Col>
            </Row>
          </Panel>
        </Col>
      </Row>
    </Grid>
  )
}

AuthForms.propTypes = {
  alertVisible: PropTypes.bool.isRequired,
  alertMessage: PropTypes.string,
  handleAlertDismiss: PropTypes.func,
  alertStyle: PropTypes.string
}