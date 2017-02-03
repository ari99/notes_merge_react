import {expect, assert} from 'chai'
import {log} from '../../utils/log'
import nock from 'nock'
import { SERVER_URL } from '../../utils/config';
import * as types from '../../actions/actionTypes'
import {saveMergeFetch} from '../../actions/saveMerge'


export class SaveMergeActionsTests  {
    
  constructor(store){
    this.store = store
  }

  dispatchFetch(expectedActions){
    return this.store.dispatch(saveMergeFetch())
                    .then(() => {
                        expect(this.store.getActions()).to.deep.equal(expectedActions)
                    })
  }

  static get successTestDescription() {
    return "creates SAVE_MERGE_SUCCESS when saving merge has been done";
  }

  static get failTestDescription() {
    return "creates SAVE_MERGE_FAILURE when saving merge has failed";
  }

  success(store){
    return ()=>{
      nock(SERVER_URL).post('/merges/')
                        .reply(200,  { "id": "1", "name": "name"})

      const expectedActions = [
                    { type: types.SAVE_MERGE_REQUEST },
                    { type: types.SAVE_MERGE_SUCCESS, "id": "1", "name": "name" },
                    { type: types.LOAD_MERGE_LIST_REQUEST }
                ]

      return this.dispatchFetch(expectedActions)
    }
  }

  fail(store){
    return () => {
      nock(SERVER_URL).post('/merges/')
                    .reply(500)

      const expectedActions = [
                    { type: types.SAVE_MERGE_REQUEST },
                    { type: types.SAVE_MERGE_FAILURE , "error":500,"message":"A server error occurred."}
                ]

      return this.dispatchFetch(expectedActions)

    }
  }
}