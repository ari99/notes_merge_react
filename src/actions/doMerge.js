import * as types from './actionTypes'
import { SERVER_URL } from '../utils/config';
import {fetchProtectedApi} from './protectedApi'

/**
* Provides methods for protectedApi.fetchProtectedApi
*/
class DoMergeActions{

  protectedApiRequest(){
    return{
      type: types.DO_MERGE_REQUEST
    }
  }

  protectApiFailure(error, message, json){
    return{
      type: types.DO_MERGE_FAILURE,
      error: error,
      message: message
    }
  }

  protectedApiSuccess(data){
    return{
      type: types.DO_MERGE_SUCCESS,
      text: data.result,
    }
  }
}


const doMergeFetch = (inputs, options) => {
  return (dispatch) => {
    const fetchParams = {
      method: "POST",
      body: JSON.stringify({"inputs":inputs, "merge_options":options}),
      headers: {
        'Accept': 'application/json',
        'Content-Type':'application/json'
      }
    }
    const url =`${SERVER_URL}/do_merge/`//end slash is  needed

    return dispatch(fetchProtectedApi(url, fetchParams, new DoMergeActions()))
  }
}


const shouldFetchMergeResult = (state) =>{
  const mergeResult = state.merge.get('result')
  if (!mergeResult) {
    return true
  } else if (mergeResult.get('isFetching')) {
    return false
  } else {
    return mergeResult.get('didInvalidate')
  }
}

export const fetchMergeResultIfNeeded = () => {
  return (dispatch, getState) => {
    if (shouldFetchMergeResult(getState())) {
      return dispatch(doMergeFetch(getState().merge.get('inputs'), getState().merge.get('merge_options')))
    }
  }
}