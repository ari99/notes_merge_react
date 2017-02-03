import { LOAD_MERGE_SUCCESS, LOAD_MERGE_FAILURE, LOAD_MERGE_REQUEST} from './actionTypes'
import { SERVER_URL } from '../utils/config';
import {fetchProtectedApi} from './protectedApi'


/**
* Provides methods used by protectedApi.fetchProtectedApi
*/
class LoadMergeActions{

  protectedApiRequest(){
    return{
      type: LOAD_MERGE_REQUEST
    }
  }

  protectApiFailure(error, message, json){
    return{
      type: LOAD_MERGE_FAILURE,
      error: error,
      message: message
    }
  }

  protectedApiSuccess(data){
    return{
      type: LOAD_MERGE_SUCCESS,
      data: data
    }
  }
}


export const loadMergeFetch = (id) => {
  return (dispatch, getState) => {
    const access_token=  getState().auth.get('access_token')
    const loadMergeFetchParams = {
                method: "GET",
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${access_token}`
                }
          }
    const url =`${SERVER_URL}/merges_api/${id}/`//end slash is  needed

    return dispatch(fetchProtectedApi(url, loadMergeFetchParams, new LoadMergeActions()))
  }
}

export const loadMergeOnEnter =  (store) => {
  return function (nextState, replace, next) {
  console.log("inside load merge on enter")
    store.dispatch(loadMergeFetch(nextState.params.id))
  }
}
