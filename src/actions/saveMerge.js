import { SAVE_MERGE_REQUEST, SAVE_MERGE_FAILURE, SAVE_MERGE_SUCCESS} from './actionTypes'
import { SERVER_URL } from '../utils/config';
import {fetchProtectedApi} from './protectedApi'
import { loadMergeListFetch } from './loadMergeList'


class SaveMergeActions{

  protectedApiRequest(){
    return{
      type: SAVE_MERGE_REQUEST
    }
  }

  protectApiFailure(error, message, json){
    return{
      type: SAVE_MERGE_FAILURE,
      error: error,
      message: message
    }
  }


  saveMergeSuccess(data){
    return{
      type: SAVE_MERGE_SUCCESS,
      name: data.name,
      id: data.id
    }
  }

  protectedApiSuccess(data){
    return (dispatch, state) => {
      dispatch(this.saveMergeSuccess(data));
      dispatch(loadMergeListFetch())

      return Promise.resolve();
    };

  }

}



export const saveMergeFetch = () => {

  return (dispatch, getState) => {
    const state = getState()
    // Transform merge to the form accepted by backend server
    let merge = state.merge.set('inputs', state.merge.get('inputs').valueSeq())
    merge = merge.set('result', state.merge.getIn(['result','text']))
    let id = merge.get('id')
    let url=null
    let method = null
    if(id === null ){
      url =`${SERVER_URL}/merges_api/`
      method = "POST"
    }else{
      url =`${SERVER_URL}/merges_api/${id}/`//end slash is  needed
      method = "PUT"
    }

    const fetchParams = {
            method: method,
            headers: {
              'Accept': 'application/json',
              'Authorization': `Bearer ${state.auth.get('access_token')}`,
              'Content-Type':'application/json'
            },
            body: JSON.stringify(merge)
          }

    return dispatch(fetchProtectedApi(url, fetchParams, new SaveMergeActions()))
  }
}