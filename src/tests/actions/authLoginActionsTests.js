import {expect, assert} from 'chai'
import {log} from '../../utils/log'
import nock from 'nock'
import { SERVER_URL } from '../../utils/config';
import * as types from '../../actions/actionTypes'
import {authLoginFetch} from '../../actions/authLogin'

//http://stackoverflow.com/questions/11485420/how-to-mock-localstorage-in-javascript-unit-tests
function storageMock() {
  var storage = {};

  return {
    setItem: function(key, value) {
      storage[key] = value || '';
    },
    getItem: function(key) {
      return key in storage ? storage[key] : null;
    },
    removeItem: function(key) {
      delete storage[key];
    },
    get length() {
      return Object.keys(storage).length;
    },
    key: function(i) {
      var keys = Object.keys(storage);
      return keys[i] || null;
    }
  }
}

window.sessionStorage = storageMock();

export class AuthLoginActionsTests  {

  constructor(store){
    this.store = store
  }

  dispatchFetch(expectedActions){
    return this.store.dispatch(authLoginFetch('test', 'test'))
                    .then(() => {
                      expect(this.store.getActions()).to.deep.equal(expectedActions)
                    })
  }

  static get successTestDescription() {
    return "creates AUTH_LOGIN_SUCCESS when logging in has been done";
  }

  static get failTestDescription() {
    return "creates AUTH_LOGIN_FAILURE when logging in has failed";
  }

  success(store){
    return ()=>{
      nock(SERVER_URL)
            .post('/o/token/')
            .reply(200,  { "access_token": "1234"})

      const expectedActions = [
                    { type: types.AUTH_LOGIN_REQUEST },
                    { type: types.AUTH_LOGIN_SUCCESS, "access_token": "1234"},
                    { type: types.LOAD_MERGE_LIST_REQUEST },
                    {"type":"@@router/CALL_HISTORY_METHOD","payload":{"method":"push","args":["/"]}}
        ]

      //always return the promise instead of using done or catching the error
      return this.dispatchFetch(expectedActions)
    }
  }

  fail(store){
    return () => {
      nock(SERVER_URL)
                    .post('/o/token/')
                    .reply(500)

      const expectedActions = [
                    { type: types.AUTH_LOGIN_REQUEST },
                    { type: types.AUTH_LOGIN_FAILURE , "error":500,"text":"A server error occurred.","style":"danger"}
                  ]

      //always return the promise instead of using done or catching the error
      return this.dispatchFetch(expectedActions)
    }
  }
}