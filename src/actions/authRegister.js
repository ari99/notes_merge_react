import { AUTH_REGISTER_REQUEST, AUTH_REGISTER_FAILURE, AUTH_REGISTER_SUCCESS} from './actionTypes'
import { SERVER_URL } from '../utils/config';
import {fetchProtectedApi} from './protectedApi'
import { authFormError } from '../actions/authForms'


/**
* Provides methods used by protectedApi.fetchProtectedApi
*/
class AuthRegisterActions{

  protectedApiRequest(){
    return{
      type: AUTH_REGISTER_REQUEST
    }
  }

  protectApiFailure(error, message, json){

    if(json.username !== undefined){
      message += " Username: "+json.username
    }

    if(json.password !== undefined){
      message += " Password: "+json.password
    }
    if(json.detail !== undefined){
      message += " Detail: "+json.detail

    }

    return{
      type: AUTH_REGISTER_FAILURE,
      error: error,
      style: "danger",
      text: message
    }
  }

  protectedApiSuccess(data){
    // Response to successful register : {"id":7,"username":"a","password":"b","merges":[]}
    return{
      type: AUTH_REGISTER_SUCCESS,
      style: "success",
      text: "Now you can login."
    }
  }

}


const authRegisterFetch = (username, password) => {
  const register_data = {"username": username,
    "password": password}

  const fetchParams = {
    method: "POST",
    body: JSON.stringify(register_data),
    headers: {
      "Content-Type": 'application/json',
    }
  }

  const url =`${SERVER_URL}/users/`
  return (dispatch, state) => {
        return dispatch(fetchProtectedApi(url, fetchParams, new AuthRegisterActions()))
  }
}

/**
*  Register new user only if reCaptcha has been verified.
*/
export const fetchAuthRegisterIfVerified = () => {
  return (dispatch, getState) => {
    const state = getState()
    if (state.authForms.get('register').get('recaptchaVerified') === true) {
      let username= state.authForms.get('register').get('username')
      let password= state.authForms.get('register').get('password')
      return dispatch(authRegisterFetch(username, password))
    }else{
      return dispatch(authFormError("Verify reCaptcha."))
    }
  }
}