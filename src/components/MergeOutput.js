import React, { PropTypes } from 'react'

export const MergeOutput = ({ text }) => {

  return (
   <div>
      <h3>Output</h3>
      <pre>{text}</pre>
   </div>
  );
}

MergeOutput.propTypes = {
  text: PropTypes.string.isRequired
}

