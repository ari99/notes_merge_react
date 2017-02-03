import {log} from '../../utils/log'
import {expect, assert} from 'chai'
import {mergeList} from '../../reducers/mergeList'
import * as types from '../../actions/actionTypes'

describe('merge list reducer', () => {

	it('should load merge list', () => {
    const initialState = undefined
    const action = {'type': types.LOAD_MERGE_LIST_SUCCESS, 'data':['test']}
    const reducerResponse = mergeList(initialState, action )
    expect(reducerResponse).to.deep.equal(['test'])
  })

})