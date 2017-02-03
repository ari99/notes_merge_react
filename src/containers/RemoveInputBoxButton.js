import { connect } from 'react-redux'
import {fetchMergeResultIfNeeded} from '../actions/doMerge'
import {invalidateMergeResult, removeInputBox } from '../actions/mergeForm'

import {OnClickButton} from '../components/OnClickButton'


const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onClick: () => {
      dispatch(removeInputBox(ownProps.inputKey))
      dispatch(invalidateMergeResult())
      dispatch(fetchMergeResultIfNeeded())
    }
  }
}

export const RemoveInputBoxButton = connect(
  null,
  mapDispatchToProps
)(OnClickButton)
