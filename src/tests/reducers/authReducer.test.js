import {log} from '../../utils/log'
import {expect, assert} from 'chai'
import {auth} from '../../reducers/auth'
import * as types from '../../actions/actionTypes'

describe('auth reducer', () => {

  it('should set authenticated on login success', () => {
    const initialState = undefined
    const action = {'type': types.AUTH_LOGIN_SUCCESS, "access_token": "test", }
    const reducerResponse = auth(initialState, action )
    expect(reducerResponse.get('access_token')).to.equal('test')
    expect(reducerResponse.get('isAuthenticated')).to.equal(true)
    expect(reducerResponse.get('isAuthenticating')).to.equal(false)
  })

  it('should set authenticating on login request', () => {
    const initialState = undefined
    const action = {'type': types.AUTH_LOGIN_REQUEST,}
    const reducerResponse = auth(initialState, action )
    expect(reducerResponse.get('isAuthenticated')).to.equal(false)
    expect(reducerResponse.get('isAuthenticating')).to.equal(true)
  })

  it('should set not authenticated on login fail', () => {
    const initialState = undefined
    const action = {'type': types.AUTH_LOGIN_FAILURE,}
    const reducerResponse = auth(initialState, action )
    expect(reducerResponse.get('isAuthenticated')).to.equal(false)
    expect(reducerResponse.get('isAuthenticating')).to.equal(false)
  })

  it('should set not authenticated on logout', () => {
    const initialState = undefined
    const action = {'type': types.AUTH_LOGOUT, }
    const reducerResponse = auth(initialState, action )
    expect(reducerResponse.get('access_token')).to.equal(null)
    expect(reducerResponse.get('isAuthenticated')).to.equal(false)
    expect(reducerResponse.get('isAuthenticating')).to.equal(false)
  })

})