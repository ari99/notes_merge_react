import { LOAD_MERGE_LIST_SUCCESS, LOAD_MERGE_LIST_FAILURE, LOAD_MERGE_LIST_REQUEST} from './actionTypes'
import { SERVER_URL } from '../utils/config';
import {fetchProtectedApi} from './protectedApi'

/**
* Provides methods used by protectedApi.fetchProtectedApi
*/
export class LoadMergeListActions{

  protectedApiRequest(){
    return{
      type: LOAD_MERGE_LIST_REQUEST
    }
  }

  protectApiFailure(error, message, json){
    return{
      type: LOAD_MERGE_LIST_FAILURE,
      error: error,
      message: message
    }
  }

  protectedApiSuccess(data){
    return{
      type: LOAD_MERGE_LIST_SUCCESS,
      data: data
    }
  }

}



export const loadMergeListFetch = () => {

  return (dispatch, getState) => {
    const access_token  = getState().auth.get('access_token')
    const fetchParams = {
      method: "GET",
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${access_token}`
      },
    }

    const url =`${SERVER_URL}/merges_api/`
    return dispatch(fetchProtectedApi(url, fetchParams, new LoadMergeListActions()))
  }
}