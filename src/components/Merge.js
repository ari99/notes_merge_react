import React, { PropTypes } from 'react'

import {InputListContainer} from '../containers/InputListContainer'
import {AddInputBoxButton} from '../containers/AddInputBoxButton'
import {MergeOutputContainer} from '../containers/MergeOutputContainer'

import {MergeOptionsContainer} from '../containers/MergeOptionsContainer'
import { Jumbotron} from 'react-bootstrap';
import {SaveMergeButton} from '../containers/SaveMergeButton'
import {MergeNameTextBoxContainer} from '../containers/MergeNameTextBoxContainer'
import {MergeListContainer} from '../containers/MergeListContainer'


export const Merge = ({isAuthenticated,}) => {
  return(
    <div id="wrapper">
      <MergeOptionsContainer />
      <div id="page-content-wrapper">
        <div className="container-fluid">
          {isAuthenticated === true ? (
              <div>
                <MergeListContainer />
              </div>
            ):(<div/>)
          }
          <Jumbotron>
            <p>Use this tool to merge multiple copies of your notes into a single text, change delimeters, and more.</p>
          </Jumbotron>
          {isAuthenticated === true ? (
              <div>
                <MergeNameTextBoxContainer />
                <SaveMergeButton> Save Merge</SaveMergeButton>
              </div>
            ):(<div/>)
          }
          <InputListContainer />
          <AddInputBoxButton divClassName="top-buffer" bsStyle="primary" bsSize="large"> Add Input </AddInputBoxButton>
          <small>Scroll right as more inputs are added.</small>
          <MergeOutputContainer />
        </div>
      </div>
    </div>
  )
}


Merge.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired
}
