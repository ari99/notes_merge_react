import { LOAD_MERGE_LIST_SUCCESS } from '../actions/actionTypes'



const initialState  = [];

export const mergeList = (state = initialState, action) => {
  switch(action.type){
    case LOAD_MERGE_LIST_SUCCESS:
      return state = action.data
    default:
      return state
  }
}

