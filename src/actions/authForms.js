import * as types from './actionTypes'


export const loginUsernameChange = (value) =>{

  return{
    type: types.LOGIN_USERNAME_CHANGE,
    value: value
  }
}

export const loginPasswordChange = (value) =>{

  return{
    type: types.LOGIN_PASSWORD_CHANGE,
    value: value
  }
}

export const registerUsernameChange = (value) =>{
  return{
    type: types.REGISTER_USERNAME_CHANGE,
    value: value
  }
}

export const registerPasswordChange = (value) =>{
  return{
    type: types.REGISTER_PASSWORD_CHANGE,
    value: value
  }
}


export const recaptchaVerifyResponse = (response) =>{
  return{
    type: types.RECAPTCHA_VERIFY_RESPONSE,
    response: response
  }
}

export const authFormError = (text) =>{
  return{
    type: types.AUTH_FORM_ERROR,
    text: text
  }
}

export const authFormAlertDismiss = () =>{
  return{
    type: types.AUTH_FORM_ALERT_DISMISS,
  }
}

