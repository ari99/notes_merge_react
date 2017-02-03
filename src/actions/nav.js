import * as types from './actionTypes'

export const updateNavActiveKey = (activeKey) =>{
  return{
    type: types.UPDATE_NAV_ACTIVE_KEY,
    activeKey: activeKey
  }
}