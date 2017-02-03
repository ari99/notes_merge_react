import { connect } from 'react-redux'
import { addInputBox } from '../actions/mergeForm'
import {OnClickButton} from '../components/OnClickButton'


const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onClick: () => { dispatch(addInputBox())}
  }
}

export const AddInputBoxButton = connect(
  null,
  mapDispatchToProps
)(OnClickButton)

