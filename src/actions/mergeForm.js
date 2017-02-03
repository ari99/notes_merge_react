import * as types from './actionTypes'

export const updateMergeName = (name) => {
  return {
    type: types.UPDATE_MERGE_NAME,
    name: name
  }
}


export const addInputBox = () => {
  return{
    type: types.ADD_INPUT_BOX,
  }
}

export const removeInputBox = (inputKey) =>{
  return{
    type: types.REMOVE_INPUT_BOX,
    inputKey: inputKey
  }
}

export const updateInputText = (inputKey, text) =>{
  return{
    type: types.UPDATE_INPUT_TEXT,
    inputKey: inputKey,
    text : text
  }
}

export const invalidateMergeResult = () =>{
  return{
    type: types.INVALIDATE_MERGE_RESULT
  }
}

export const updateOptions = (optionKey, optionValue) =>{
  return{
    type: types.UPDATE_OPTIONS,
    optionKey: optionKey,
    optionValue: optionValue
  }
}




export const clearMergeForm = () =>{
  return{
    type: types.CLEAR_MERGE_FORM
  }
}


