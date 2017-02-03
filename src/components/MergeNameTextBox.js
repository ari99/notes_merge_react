import React, { PropTypes } from 'react'
import { FormGroup, FormControl, } from 'react-bootstrap';


export const MergeNameTextBox = ({value, onChange, placeholder, controlId, validationState}) => {
 return (
  <FormGroup controlId={controlId} validationState={validationState}>
    <FormControl type="text" value={value} onChange={onChange} placeholder={placeholder} />
  </FormGroup>
  )
}

MergeNameTextBox.propTypes = {
  controlId: PropTypes.string,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  validationState: PropTypes.string.isRequired
}

