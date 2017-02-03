import {log} from '../../utils/log'
import {expect, assert} from 'chai'
import {merge} from '../../reducers/merge'
import * as types from '../../actions/actionTypes'

describe('merge reducer', () => {

  it('should invalidate merge', () => {
    const initialState = undefined
    const action = {'type': types.INVALIDATE_MERGE_RESULT}
    const reducerResponse = merge(initialState, action )
    expect(reducerResponse.get('result').get('didInvalidate')).to.equal(true)
  })

  it('should setup do_merge request', () => {
    const initialState = undefined
    const action = {'type': types.DO_MERGE_REQUEST}
    const reducerResponse = merge(initialState, action )
    expect(reducerResponse.get('result').get('didInvalidate')).to.equal(false)
    expect(reducerResponse.get('result').get('isFetching')).to.equal(true)

  })

  it('should add an input and increase input count', () => {
    const initialState = undefined
    const action = {'type': types.ADD_INPUT_BOX}
    const reducerResponse = merge(initialState, action )
    expect(reducerResponse.get('input_counter')).to.equal(1)
    expect(reducerResponse.get('inputs').get(1).get("text")).to.equal("")
  })

})

