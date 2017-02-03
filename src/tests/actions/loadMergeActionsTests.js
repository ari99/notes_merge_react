import {expect, assert} from 'chai'
import {log} from '../../utils/log'
import nock from 'nock'
import { SERVER_URL } from '../../utils/config';
import * as types from '../../actions/actionTypes'
import {loadMergeFetch} from '../../actions/loadMerge'


export class LoadMergeActionsTests  {

  constructor(store){
    this.store = store
  }

  dispatchFetch(expectedActions){
    return this.store.dispatch(loadMergeFetch(1))
                    .then(() => {
                        log(JSON.stringify(this.store.getActions()))
                        expect(this.store.getActions()).to.deep.equal(expectedActions)
                    })
  }

  static get successTestDescription() {
    return "creates LOAD_MERGE_SUCCESS when fetching merge has been done";
  }

  static get failTestDescription() {
    return "creates LOAD_MERGE_FAILURE when fetching merge has failed";
  }

  success(){
    return ()=>{
      nock(SERVER_URL).get('/merges/1/')
                        .reply(200,  { "test": "test"})

      const expectedActions = [
                    { type: types.LOAD_MERGE_REQUEST },
                    { type: types.LOAD_MERGE_SUCCESS, data: { "test":"test"  } }
                ]

      return this.dispatchFetch(expectedActions)
    }
  }




        fail(){
            return () => {
                nock(SERVER_URL)
                    .get('/merges/1/')
                    .reply(500)

                const expectedActions = [
                    { type: types.LOAD_MERGE_REQUEST },
                    { type: types.LOAD_MERGE_FAILURE , "error":500,"message":"A server error occurred."}
                ]

                //always return the promise instead of using done or catching the error
                return this.dispatchFetch(expectedActions)

            }

        }
}