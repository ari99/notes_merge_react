import fetch from 'isomorphic-fetch';
import { push } from 'react-router-redux';


const checkHttpStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}



/**
*  Uses duck typing to assume the correct methods are in the apiActions param.
*  Fetches data from the backend.
*/
export const fetchProtectedApi = ( url, fetchParams, apiActions) => {
  return (dispatch, getState) => {
    dispatch(apiActions.protectedApiRequest());
    return fetch(url, fetchParams )
      .then(checkHttpStatus)
      .then(response => { return response.json() } )
      .then(json => {
              dispatch(apiActions.protectedApiSuccess(json))
            })
      .catch((error) => {
        if(error.response !== undefined){
          if (error && typeof error.response !== 'undefined' && error.response.status === 401) {
            error.response.json().then( (json) => {
              dispatch(apiActions.protectApiFailure(401, "You are not logged in.", json));
              dispatch(push('/login'))
            })
          } else if (error && typeof error.response !== 'undefined' && error.response.status >= 500) {
            dispatch(apiActions.protectApiFailure(500, 'A server error occurred.', {}));
          } else {
            dispatch(apiActions.protectApiFailure('Connection Error', 'An error occurred.', {}));
          }
        }
        return Promise.resolve();
      })
  }
}