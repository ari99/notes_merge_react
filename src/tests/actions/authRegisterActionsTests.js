import {expect, assert} from 'chai'
import {log} from '../../utils/log'
import nock from 'nock'
import { SERVER_URL } from '../../utils/config';
import * as types from '../../actions/actionTypes'
import {fetchAuthRegisterIfVerified} from '../../actions/authRegister'


export class AuthRegisterActionsTests  {

  constructor(store){
    this.store = store
  }

  dispatchFetch(expectedActions){
    return this.store.dispatch(fetchAuthRegisterIfVerified())
                    .then(() => {
                        expect(this.store.getActions()).to.deep.equal(expectedActions)
                    })
  }

  static get successTestDescription() {
    return "creates AUTH_REGISTER_SUCCESS when registering has been done";
  }

  static get failTestDescription() {
    return "creates AUTH_REGISTER_FAILURE when registering has failed";
  }


  success(store){
    return ()=>{
      nock(SERVER_URL).post('/users/')
                        .reply(200,  { "id": "1234"})

      const expectedActions = [
                    { type: types.AUTH_REGISTER_REQUEST },
                    { type: types.AUTH_REGISTER_SUCCESS, style: "success",
                            text: "Now you can login."}
                ]

      //always return the promise instead of using done or catching the error
      return this.dispatchFetch(expectedActions)
    }
  }

  fail(store){
    return () => {
      nock(SERVER_URL).post('/users/')
                    .reply(500)

      const expectedActions = [
                    { type: types.AUTH_REGISTER_REQUEST },
                    { type: types.AUTH_REGISTER_FAILURE , "error":500,"text":"A server error occurred.","style":"danger"}
      ]

      //always return the promise instead of using done or catching the error
      return this.dispatchFetch(expectedActions)

    }
  }
}