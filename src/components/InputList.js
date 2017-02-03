import React, { PropTypes } from 'react'
import {InputTextBoxContainer} from '../containers/InputTextBoxContainer'
import {RemoveInputBoxButton} from '../containers/RemoveInputBoxButton'
import { Map, } from 'immutable';

export const InputList = ({inputs, inputOnChange}) => {
  return (
    <div className="input-container">
      {inputs.entrySeq().map((entry, index) =>
        <div key={"d-"+entry[0]} className="input-child">
          <InputTextBoxContainer key={"input-"+entry[0]} id={entry[1].get('id')}
              inputKey={entry[0]} value={entry[1].get('text')} />
          <RemoveInputBoxButton bsStyle="danger" bsSize="xsmall" key={"remove-"+entry[0]} inputKey={entry[0]}>
            Remove Input {entry[0]}
          </RemoveInputBoxButton>
        </div>
      )}
    </div>
)}

InputList.propTypes = {
    inputs: PropTypes.instanceOf(Map),
    inputOnChange: PropTypes.func.isRequired
}
