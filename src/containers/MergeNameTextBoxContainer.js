import { connect } from 'react-redux'
import {updateMergeName} from '../actions/mergeForm'
import {MergeNameTextBox} from '../components/MergeNameTextBox'

const getValidationState = (value) =>{
  if (value !== undefined){
    const length = value.length;
    if (length > 0) return 'success';
    else if (length <= 0) return 'error';
  }else{
    return 'success'
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    value: state.merge.get('name'),
    controlId: 'mergeName',
    placeholder: 'Enter Merge Name',
    validationState: getValidationState(state.merge.get('name'))
  }
}


const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onChange: (e) => {
      dispatch(updateMergeName(e.target.value))
    }
  }
}

export const MergeNameTextBoxContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MergeNameTextBox)

