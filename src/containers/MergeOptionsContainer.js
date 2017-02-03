import { connect } from 'react-redux'
import {MergeOptions} from '../components/MergeOptions'
import {fetchMergeResultIfNeeded} from '../actions/doMerge'
import {invalidateMergeResult, updateOptions } from '../actions/mergeForm'


const mapStateToProps = (state) => {
  return {
    options: state.merge.get('merge_options')
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    optionOnChange: (optionKey, optionValue) => {
              dispatch(updateOptions(optionKey, optionValue))
              dispatch(invalidateMergeResult())
              dispatch(fetchMergeResultIfNeeded())
    }
  }
}


export const MergeOptionsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MergeOptions)

