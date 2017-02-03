import {expect, assert} from 'chai'
import {log} from '../../utils/log'
import nock from 'nock'
import { SERVER_URL } from '../../utils/config';
import * as types from '../../actions/actionTypes'
import {fetchMergeResultIfNeeded} from '../../actions/doMerge'


export class DoMergeActionsTests  {

  constructor(store){
    this.store = store
  }

  dispatchFetch(expectedActions){
    return this.store.dispatch(fetchMergeResultIfNeeded())
                    .then(() => {
                        expect(this.store.getActions()).to.deep.equal(expectedActions)
                    })
  }

  static get successTestDescription() {
    return "creates DO_MERGE_SUCCESS when calculating merge has been done";
  }

  static get failTestDescription() {
    return "creates DO_MERGE_FAILURE when calculating merge has failed";
  }

  success(store){
    return ()=>{
      nock(SERVER_URL).post('/do_merge/')
                        .reply(200,  { "result": "test"})

      const expectedActions = [
                    { type: types.DO_MERGE_REQUEST },
                    { type: types.DO_MERGE_SUCCESS, "text":"test" },
                ]

      return this.dispatchFetch(expectedActions)
    }
  }

  fail(store){
    return () => {
      nock(SERVER_URL).post('/do_merge/')
                    .reply(500)

      const expectedActions = [
                    { type: types.DO_MERGE_REQUEST },
                    { type: types.DO_MERGE_FAILURE , "error":500,"message":"A server error occurred."}
                ]

      return this.dispatchFetch(expectedActions)
    }
  }
}