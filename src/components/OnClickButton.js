import React, { PropTypes } from 'react'
import { Button } from 'react-bootstrap'

export const OnClickButton = ({ children, onClick, bsStyle, bsSize, divClassName }) => {
  return(
    <div className={divClassName}>
      <Button bsStyle={bsStyle} bsSize={bsSize} onClick={e => {
        e.preventDefault();
        onClick();
      }}>
        {children}
      </Button>
    </div>
  )
}



OnClickButton.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired
}

