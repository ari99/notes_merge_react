import {UPDATE_NAV_ACTIVE_KEY} from '../actions/actionTypes';


const initialState  = 1;

export const navActiveKey = (state = initialState, action) => {
  switch(action.type){
    case UPDATE_NAV_ACTIVE_KEY:
      return state = action.activeKey
    default:
      return state
  }
}
