import React from 'react'
import { shallow } from 'enzyme'
import { mount } from 'enzyme';
import {expect, assert} from 'chai'

import {MergeContainer} from '../../containers/MergeContainer'
import {MergeListContainer} from '../../containers/MergeListContainer'


import {MergeNameTextBoxContainer} from '../../containers/MergeNameTextBoxContainer'
import {SaveMergeButton} from '../../containers/SaveMergeButton'
import {MergeOutputContainer} from '../../containers/MergeOutputContainer'
import {MergeOptionsContainer} from '../../containers/MergeOptionsContainer'

import {AddInputBoxButton} from '../../containers/AddInputBoxButton'

import {LoginForm} from '../../components/LoginForm'

import {log} from '../../utils/log'
import { Map } from 'immutable';
import { Grid, Row, Col, Panel, Alert } from 'react-bootstrap';
import { Provider } from 'react-redux';

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as types from '../../actions/actionTypes'
import * as options from '../../components/MergeOptions'


function getStore(authenticated=false){

  let state = {
    'auth':Map({
      'access_token': null,
      'isAuthenticated': authenticated,
      'isAuthenticating': false
      }),
    'merge':  Map({
      'id' : null,
      'name': "",
      'inputs': Map(),
      'result': Map({
                  'isFetching': false,
                  'didInvalidate': false,
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

      }),
    'mergeList': []
  }

  const middlewares = [thunk];
  const mockStore = configureStore(middlewares);
  const store = mockStore(state);
  return store
}


describe('merge container', () => {
  it('should have basic merge components', () =>{
    const store = getStore(false)
    const wrapper = mount(<Provider store={store}><MergeContainer /></Provider>)

    expect(wrapper.find(AddInputBoxButton)).to.have.length(1)
    expect(wrapper.find(MergeOutputContainer)).to.have.length(1)
    expect(wrapper.find(MergeOptionsContainer)).to.have.length(1)

  })

  it('should not have protected components when not authenticated', () =>{
    const store = getStore(false)
    const wrapper = mount(<Provider store={store}><MergeContainer /></Provider>)

    expect(wrapper.find(MergeListContainer)).to.have.length(0)
    expect(wrapper.find(SaveMergeButton)).to.have.length(0)
    expect(wrapper.find(MergeNameTextBoxContainer)).to.have.length(0)
  })

  it('should have protected components when authenticated', () =>{
    const store = getStore(true)
    const wrapper = mount(<Provider store={store}><MergeContainer /></Provider>)

    expect(wrapper.find(MergeListContainer)).to.have.length(1)
    expect(wrapper.find(SaveMergeButton)).to.have.length(1)
    expect(wrapper.find(MergeNameTextBoxContainer)).to.have.length(1)

  })

})

describe('merge form behavior', () => {

  it('should dispatch add input box action on relevant button click', ()=>{
    const store = getStore()
    const wrapper = mount(<Provider store={store}><MergeContainer /></Provider>)

    const button = wrapper.find(AddInputBoxButton).find('button')
    button.at(0).simulate('click')

    const expectedActions = [{ type: types.ADD_INPUT_BOX }]
    expect(store.getActions()).to.deep.equal(expectedActions)

  })

  it('should dispatch action on merge options input change', () => {
    const store = getStore()
    const wrapper = mount(<Provider store={store}><MergeContainer /></Provider>)

    const optionInput = wrapper.find(MergeOptionsContainer).find('textarea').at(0)
    optionInput.simulate('change', { target: { value: 'changedvalue' } })

    const expectedActions = [{  type: types.UPDATE_OPTIONS,
                                optionKey: options.INPUT_DELIMITER,
                                optionValue: 'changedvalue'  },
                                {type: types.INVALIDATE_MERGE_RESULT}
                                    //doMergeRequest depends on reducers, which are not run
                            ]

    expect(store.getActions()).to.deep.equal(expectedActions)

  })

})
