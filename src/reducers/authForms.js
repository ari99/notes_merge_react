import { Map } from 'immutable';
import * as types from '../actions/actionTypes'



const initialState  = Map({
  'login': Map({'username': "", 'password':""}),
  'register': Map({'username': "", 'password':"", 'recaptchaVerified': false}),
  'alertMessage': "",
  'alertVisible': false,
  'alertStyle':'',
});


export const authForms = (state = initialState, action) => {

  switch(action.type){
    case types.LOGIN_USERNAME_CHANGE:
      return state.setIn(['login', 'username'], action.value)
    case types.LOGIN_PASSWORD_CHANGE:
      return state.setIn(['login', 'password'], action.value)
    case types.REGISTER_USERNAME_CHANGE:
      return state.setIn(['register', 'username'], action.value)
    case types.REGISTER_PASSWORD_CHANGE:
      return state.setIn(['register','password'], action.value)
    case types.RECAPTCHA_VERIFY_RESPONSE:
      return state.setIn(['register', 'recaptchaVerified'], true)
    case types.AUTH_FORM_ERROR:
    case types.AUTH_REGISTER_FAILURE:
    case types.AUTH_LOGIN_FAILURE:
      return state.set('alertMessage', action.text).set('alertVisible', true).set('alertStyle',action.style)
    case types.AUTH_FORM_ALERT_DISMISS:
      return state.set('alertMessage', '').set('alertVisible', false).set('alertStyle', '')
    case types.AUTH_REGISTER_SUCCESS:
      return state.set('alertMessage', action.text).set('alertVisible', true).set('alertStyle',action.style)
    default:
      return state
  }
}



