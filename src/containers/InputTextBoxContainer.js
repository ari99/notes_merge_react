import { connect } from 'react-redux'
import {fetchMergeResultIfNeeded} from '../actions/doMerge'
import {invalidateMergeResult, updateInputText } from '../actions/mergeForm'
import {InputTextBox} from '../components/InputTextBox'


const getValidationState = (value) => {
  if (value !== undefined){
    const length = value.length;
    if (length < 450) return 'success';
    else if (length > 450) return 'warning';
    else if (length > 495) return 'error';
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    validationState: getValidationState(ownProps.value)
  }
}


const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onChange: (inputKey, text) => {
              dispatch(updateInputText(inputKey, text))
              dispatch(invalidateMergeResult())
              dispatch(fetchMergeResultIfNeeded())
    }
  }
}

export const InputTextBoxContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(InputTextBox)

