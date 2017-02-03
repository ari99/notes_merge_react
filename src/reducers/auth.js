import { Map } from 'immutable';

import {
  AUTH_LOGIN_REQUEST,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGIN_FAILURE,
  AUTH_LOGOUT
} from '../actions/actionTypes';



const initialState = Map({
  'access_token': null,
  'isAuthenticated': false,
  'isAuthenticating': false
});

export const auth = (state = initialState, action) => {
  switch(action.type){
    case AUTH_LOGIN_SUCCESS:
      return state.set('access_token', action.access_token).
              set('isAuthenticated', true).
              set('isAuthenticating', false)
    case AUTH_LOGIN_REQUEST:
      return state.set('isAuthenticated', false).
              set('isAuthenticating', true);
    case AUTH_LOGIN_FAILURE:
      return state.set('isAuthenticated', false).
              set('isAuthenticating', false);
    case AUTH_LOGOUT:
      return state.set('access_token', null).
              set('isAuthenticated', false).
              set('isAuthenticating', false);
    default:
      return state;
  }
}

