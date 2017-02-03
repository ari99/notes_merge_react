import { connect } from 'react-redux'
import { saveMergeFetch } from '../actions/saveMerge'
import {OnClickButton} from '../components/OnClickButton'

const mapStateToProps = (state, ownProps) => {
  return {
    bsStyle: ownProps.bsStyle,
    bsSize: ownProps.bsSize,
    divClassName: ownProps.divClassName
  }

}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onClick: () => {
      dispatch(saveMergeFetch())
    }
  }
}

export const SaveMergeButton = connect(
    mapStateToProps,
    mapDispatchToProps
)(OnClickButton)

