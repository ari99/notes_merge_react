import { connect } from 'react-redux'
import {InputList} from '../components/InputList'
import {fetchMergeResultIfNeeded} from '../actions/doMerge'
import {invalidateMergeResult, updateInputs } from '../actions/mergeForm'

const mapStateToProps = (state) => {
  return {
    inputs: state.merge.get('inputs')
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    inputOnChange: (id, text) => {
              dispatch(updateInputs(id, text))
              dispatch(invalidateMergeResult())
              dispatch(fetchMergeResultIfNeeded())
    }
  }
}

export const InputListContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(InputList)

