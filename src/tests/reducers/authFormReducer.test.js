import {log} from '../../utils/log'
import {expect, assert} from 'chai'
import {authForms} from '../../reducers/authForms'
import * as types from '../../actions/actionTypes'

describe('auth form reducer', () => {

  it('should display alert', () => {
    const initialState = undefined
    const action = {'type': types.AUTH_LOGIN_FAILURE, "text": "test", "style":"test", }
    const reducerResponse = authForms(initialState, action )
    expect(reducerResponse.get('alertMessage')).to.equal('test')
    expect(reducerResponse.get('alertStyle')).to.equal('test')
    expect(reducerResponse.get('alertVisible')).to.equal(true)

  })

  it('should hide alert', () => {
    const initialState = undefined
    const action = {'type': types.AUTH_FORM_ALERT_DISMISS,}
    const reducerResponse = authForms(initialState, action )
    expect(reducerResponse.get('alertMessage')).to.equal('')
    expect(reducerResponse.get('alertStyle')).to.equal('')
    expect(reducerResponse.get('alertVisible')).to.equal(false)

  })
})