import React from 'react'
import { shallow } from 'enzyme'
import { mount } from 'enzyme';
import {expect, assert} from 'chai'

import {AuthFormsContainer} from '../../containers/AuthFormsContainer'
import {LoginForm} from '../../components/LoginForm'

import {log} from '../../utils/log'
import { Map } from 'immutable';
import { Grid, Row, Col, Panel, Alert } from 'react-bootstrap';
import { Provider } from 'react-redux';

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as types from '../../actions/actionTypes'



function getStore(){

  let state = {'authForms': Map({
                'login': Map({'username': "aa", 'password':""}),
                'register': Map({'username': "", 'password':"", 'recaptchaVerified': false}),
                'alertMessage': "",
                'alertVisible': false,
                'alertStyle':'',
                })
              }

  const middlewares = [thunk];
  const mockStore = configureStore(middlewares);
  const store = mockStore(state);
  return store
}


describe('auth forms container', () => {
  it('should have usernames and password fields', () =>{
    const store = getStore()
    const wrapper = mount(<Provider store={store}><AuthFormsContainer /></Provider>)
    
    expect(wrapper.find(Grid)).to.have.length(1)
    
    const input = wrapper.find('input');
    expect(input).to.have.length(4);
    expect(input.at(0).prop('type')).to.equal('text');
    expect(input.at(1).prop('type')).to.equal('password');
    expect(input.at(2).prop('type')).to.equal('text');
    expect(input.at(3).prop('type')).to.equal('password');
  })

})

describe('login form behavior', () => {

  const props = {
    loginUsernameValue: "usernameVal",
    loginPasswordValue: "passwordVal",
    loginUsernameOnChange: jest.fn(),
    loginPasswordOnChange: jest.fn(),
  }

  it('should dispatch login request action on click', ()=>{
    const store = getStore()
    const wrapper = mount(<Provider store={store}><LoginForm {...props} /></Provider>)

    const buttons = wrapper.find('button')
    buttons.at(0).simulate('click')

    const expectedActions = [{ type: types.AUTH_LOGIN_REQUEST }]
    expect(store.getActions()).to.deep.equal(expectedActions)

  })

  it('should dispatch action on login username change', () => {
    const store = getStore()
    const wrapper = mount(<Provider store={store}><AuthFormsContainer /></Provider>)

    const inputUsername = wrapper.find('input').at(0);
    inputUsername.simulate('change', { target: { value: 'changedvalue' } });
    const expectedActions = [{ type: types.LOGIN_USERNAME_CHANGE, value: 'changedvalue'  }]
    expect(store.getActions()).to.deep.equal(expectedActions)
  })

})
