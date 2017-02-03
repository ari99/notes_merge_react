import React, { PropTypes } from 'react'
import { FormGroup, ControlLabel, FormControl } from 'react-bootstrap';



export const InputTextBox = ({ inputKey, onChange, value, validationState}) => (
  <FormGroup
    controlId="formBasicText"
    validationState={validationState}
    bsClass="top-buffer input-form-group">

    <ControlLabel>Input {inputKey}: </ControlLabel>

    <FormControl
      value={value}
      placeholder="Enter text"
      onChange={(event) => onChange(inputKey, event.target.value)}
      componentClass="textarea"
      rows="10"
      cols="20"
      bsClass="form-control input-form-control"
      maxLength="500"/>
  </FormGroup>
)

InputTextBox.propTypes = {
  inputKey: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  validationState: PropTypes.string.isRequired,

}

