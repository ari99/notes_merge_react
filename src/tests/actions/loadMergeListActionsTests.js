import {expect, assert} from 'chai'
import {log} from '../../utils/log'
import nock from 'nock'
import { SERVER_URL } from '../../utils/config';
import * as types from '../../actions/actionTypes'
import {loadMergeListFetch} from '../../actions/loadMergeList'


export class LoadMergeListActionsTests  {

  constructor(store){
    this.store = store
  }

  dispatchFetch(expectedActions){
    return this.store.dispatch(loadMergeListFetch())
                    .then(() => {
                        expect(this.store.getActions()).to.deep.equal(expectedActions)
                    })
  }

  static get successTestDescription() {
    return "creates LOAD_MERGE_LIST_SUCCESS when fetching merge list has been done";
  }

  static get failTestDescription() {
    return "creates LOAD_MERGE_LIST_FAILURE when fetching merge list has failed";
  }

  success(store){
    return ()=>{
      nock(SERVER_URL).get('/merges/')
                        .reply(200,  { "test":"test"})

      const expectedActions = [
                    { type: types.LOAD_MERGE_LIST_REQUEST },
                    { type: types.LOAD_MERGE_LIST_SUCCESS, data: { "test":"test"  }  }
                ]

      return this.dispatchFetch(expectedActions)
    }
  }

  fail(store){
    return () => {
      nock(SERVER_URL).get('/merges/')
                    .reply(500)

      const expectedActions = [
                    { type: types.LOAD_MERGE_LIST_REQUEST },
                    { type: types.LOAD_MERGE_LIST_FAILURE , "error":500,"message":"A server error occurred."}
                ]

      return this.dispatchFetch(expectedActions)

    }
  }
}