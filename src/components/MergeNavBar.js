import React, { PropTypes } from 'react'
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { IndexLinkContainer } from 'react-router-bootstrap'


export const MergeNavBar = ({ handleSelect, isAuthenticated, navActiveKey }) => {
  return(
    <Navbar >
      <Navbar.Header>
        <Navbar.Brand>
          <a href="/">Notes Merger</a>
        </Navbar.Brand>
      </Navbar.Header>
      {isAuthenticated === true ? (
        <Nav bsStyle="pills" onSelect={handleSelect} activeKey={navActiveKey}>
          <IndexLinkContainer to="/" >
            <NavItem eventKey={1}>Home</NavItem>
          </IndexLinkContainer>
          <LinkContainer to="/logout">
            <NavItem eventKey={3}>Log out</NavItem>
          </LinkContainer>
        </Nav>
      ) : (
        <Nav bsStyle="pills" onSelect={handleSelect} activeKey={navActiveKey}>
          <IndexLinkContainer to="/" >
            <NavItem eventKey={1}>Home</NavItem>
          </IndexLinkContainer>
          <LinkContainer to="/login">
            <NavItem eventKey={2}>Login</NavItem>
          </LinkContainer>
        </Nav>
      )}
    </Navbar>
  )
}


MergeNavBar.propTypes = {
  handleSelect: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired
}



