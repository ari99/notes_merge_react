import React, { PropTypes } from 'react'
import './css/App.css';
import {MergeNavBarContainer} from "../containers/MergeNavBarContainer"

export const App = ({ children }) => {
  return(
    <div>
      <MergeNavBarContainer />
      { children }
    </div>
  )
}


App.propTypes = {
  children: PropTypes.node.isRequired
}