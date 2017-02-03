import { combineReducers } from 'redux'
import {mergeList} from './mergeList'
import {merge} from './merge'
import {authForms} from './authForms'
import {auth} from './auth'
import {navActiveKey} from './nav'
import { routerReducer } from 'react-router-redux';


export const mergeApp = combineReducers({
  mergeList,
  merge,
  authForms,
  routerReducer,
  auth,
  navActiveKey
})

