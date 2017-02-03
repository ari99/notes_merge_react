import { AUTH_LOGIN_REQUEST, AUTH_LOGIN_FAILURE, AUTH_LOGIN_SUCCESS, AUTH_LOGOUT} from './actionTypes'
import { SERVER_URL, APP_AUTH_PASSWORD, APP_AUTH_USERNAME } from '../utils/config';
import {fetchProtectedApi} from './protectedApi'
import {stringify} from 'query-string'
import { push } from 'react-router-redux';
import { loadMergeListFetch } from './loadMergeList'

/**
* Provides methods used by protectedApi.fetchProtectedApi
*/
export class AuthLoginActions{

  protectedApiRequest(){
    return{
      type: AUTH_LOGIN_REQUEST
    }
  }

  protectApiFailure(error, message){
    return{
      type: AUTH_LOGIN_FAILURE,
      error: error,
      text: message,
      style: "danger"
    }
  }

  authLoginSuccess(data){

    sessionStorage.setItem('access_token', data.access_token);

    return{
      type: AUTH_LOGIN_SUCCESS,
      access_token: data.access_token,

    }
  }

  //redux thunk provides dispatch and getState
  protectedApiSuccess(data){
    return (dispatch, state) => {
      dispatch(this.authLoginSuccess(data));
      dispatch(loadMergeListFetch())
      dispatch(push('/'));
      return Promise.resolve();
    }
  }
}



export const authLogout = () => {
  sessionStorage.removeItem('token');
  sessionStorage.removeItem('user');
  return{
    type: AUTH_LOGOUT
  }
}

export const authLoginFetch = () => {
  //https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Template_literals
  return (dispatch, getState) => {
    const state = getState()
    const login_data = {"grant_type": "password",
    "username": state.authForms.get('login').get('username'),
    "password": state.authForms.get('login').get('password')}
    const app_auth_username = APP_AUTH_USERNAME
    const app_auth_password = APP_AUTH_PASSWORD
    const app_auth= app_auth_username+":"+app_auth_password
    const bauth = btoa(app_auth)
    
    const fetchParams ={
      method: "POST",
      body: stringify(login_data),
      headers: {
        'Content-Type':  'application/x-www-form-urlencoded;charset=UTF-8',
        'Authorization': `Basic ${bauth}` 
      }
    }
    const url =`${SERVER_URL}/o/token/`

    return dispatch(fetchProtectedApi(url, fetchParams, new AuthLoginActions()))
  }

}