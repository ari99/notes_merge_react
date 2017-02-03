import configureStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'
import nock from 'nock'
import { Map, } from 'immutable';
import {log} from '../../utils/log'
import { createAction } from 'redux-actions';
import {expect, assert} from 'chai'
import {LoadMergeActionsTests} from './loadMergeActionsTests'
import {SaveMergeActionsTests} from './saveMergeActionsTests'
import {LoadMergeListActionsTests} from './loadMergeListActionsTests'
import {AuthLoginActionsTests} from './authLoginActionsTests'
import {AuthRegisterActionsTests} from './authRegisterActionsTests'
import {DoMergeActionsTests} from './doMergeActionsTests'

import * as options from '../../components/MergeOptions'


describe('async actions', () => {

  var originalTimeout;
  const middlewares = [thunkMiddleware];
  const mockStore = configureStore(middlewares);
  let merge = Map({
        'id' : null,
        'name': "",
        'inputs': Map(),
        'result': Map({
                      'isFetching': false,
                      'didInvalidate': true,
                      'text': "Result"
                    }),
        'merge_options': Map({
                      [options.INPUT_DELIMITER]: "\n\n",
                      [options.OUTPUT_DELIMITER]: "\n\n",
                      [options.REMOVE_STOP_WORDS]: false,
                      [options.PORTER_STEMMER]: false,
                      [options.WORDNET_LEMMATIZER]: false,
                      [options.LOWERCASE]: false,
                      [options.ALPHANUMERIC_FILTER]:false,
                      [options.ALPHA_FILTER]:false,
                      [options.NUMERIC_FILTER]:false
                    }),
        'input_counter': 0
    })

  let authForms=  Map({
          'login': Map({'username': "", 'password':""}),
          'register': Map({'username': "", 'password':"", 'recaptchaVerified': true}),
          'alertError': "",
          'alertVisible': false,
          'alertStyle':'',
        });

  let store = mockStore( {"auth":Map({"access_token": "1234"}),
                            "merge": merge,
                             "authForms": authForms})

  beforeEach(() => {
    store.clearActions()

    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 5000
  })

  afterEach(() => {
    nock.cleanAll()
  })

  const loadMergeTests = new LoadMergeActionsTests(store)
  it(LoadMergeActionsTests.successTestDescription, loadMergeTests.success())
  it(LoadMergeActionsTests.failTestDescription, loadMergeTests.fail())

  const saveMergeTests = new SaveMergeActionsTests(store)
  it(SaveMergeActionsTests.successTestDescription, saveMergeTests.success())
  it(SaveMergeActionsTests.failTestDescription, saveMergeTests.fail())

  const loadMergeListTests = new LoadMergeListActionsTests(store)
  it(LoadMergeListActionsTests.successTestDescription, loadMergeListTests.success())
  it(LoadMergeListActionsTests.failTestDescription, loadMergeListTests.fail())

  const authLoginActionsTests = new AuthLoginActionsTests(store)
  it(AuthLoginActionsTests.successTestDescription, authLoginActionsTests.success())
  it(AuthLoginActionsTests.failTestDescription, authLoginActionsTests.fail())

  const authRegisterActionsTests = new AuthRegisterActionsTests(store)
  it(AuthRegisterActionsTests.successTestDescription, authRegisterActionsTests.success())
  it(AuthRegisterActionsTests.failTestDescription, authRegisterActionsTests.fail())

  const doMergeActionsTests = new DoMergeActionsTests(store)
  it(DoMergeActionsTests.successTestDescription, doMergeActionsTests.success())
  it(DoMergeActionsTests.failTestDescription, doMergeActionsTests.fail())

})

