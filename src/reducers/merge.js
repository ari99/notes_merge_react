import { Map, } from 'immutable';
import * as options from '../components/MergeOptions'
import prettyI from 'pretty-immutable'
import * as types from '../actions/actionTypes'



const initialState  = Map({
    'id' : null,
    'name': "",
    'inputs': Map(),
    'result': Map({
                  'isFetching': false,
                  'didInvalidate': false,
                  'text': "Result"
                }),
    'merge_options': Map({
                  [options.INPUT_DELIMITER]: "\n\n",
                  [options.OUTPUT_DELIMITER]: "\n\n",
                  [options.REMOVE_STOP_WORDS]: false,
                  [options.PORTER_STEMMER]: false,
                  [options.WORDNET_LEMMATIZER]: false,
                  [options.LOWERCASE]: false,
                  [options.ALPHANUMERIC_FILTER]:false,
                  [options.ALPHA_FILTER]:false,
                  [options.NUMERIC_FILTER]:false
                }),
    'input_counter': 0

});



export const merge = (state = initialState, action) => {

  switch(action.type){
      case types.CLEAR_MERGE_FORM:
        return initialState
      case types.SAVE_MERGE_SUCCESS:
          return state.set('id', action.id)
      case types.LOAD_MERGE_SUCCESS:
          let inputMap = Map()
          action.data.inputs.map((input) => {
              let count = state.get('input_counter') + 1
              state = state.set('input_counter', count)
              inputMap = inputMap.set(count, Map({'id': input.id, 'text':input.text}))
          })
          state = state.set('id', action.data.id)
          state = state.set('name', action.data.name)
          state = state.set('inputs', inputMap)
          state = state.set('merge_options', Map(action.data.merge_options))
          state = state.setIn(['result','text'], action.data.result)

          //console.log(prettyI(state))

          return state
          
      //result
      case types.INVALIDATE_MERGE_RESULT:
          return state.setIn(['result', 'didInvalidate'], true);
      case types.DO_MERGE_REQUEST:
          return state.setIn(['result', 'didInvalidate'], false)
                         .setIn(['result', 'isFetching'], true);
      case types.DO_MERGE_SUCCESS:
           return state.set('result', Map ({
                              'isFetching': false,
                              'didInvalidate': false,
                              'text': action.text,
                              }))
      case types.UPDATE_MERGE_NAME:
          return state.set('name', action.name)

      //options
      case types.UPDATE_OPTIONS:
          return state.setIn(['merge_options', action.optionKey], action.optionValue)

      //inputs
      case types.REMOVE_INPUT_BOX:
          return state.deleteIn(['inputs', action.inputKey]);
      case types.UPDATE_INPUT_TEXT:
          return state.setIn(['inputs', action.inputKey, 'text'], action.text)
      case types.ADD_INPUT_BOX:
          let count = state.get('input_counter') + 1
          state = state.set('input_counter', count)
          return state.setIn(['inputs', count], Map({'text':""}))
      case types.AUTH_LOGOUT:
           return initialState;
      default:
          return state;

    }
}

