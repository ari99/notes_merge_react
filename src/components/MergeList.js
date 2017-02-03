import React, { PropTypes } from 'react'
import { Nav, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

export const MergeList = ({ mergeList }) => {
  return (
    <Nav bsStyle="pills" activeKey={1} >
      {mergeList.map(merge =>
        <LinkContainer key={merge.id} to={"/merge/"+merge.id}>
          <NavItem eventKey={merge.id}>{merge.name}</NavItem>
        </LinkContainer>
      )}
    </Nav>
  )
}

MergeList.propTypes = {
  mergeList: PropTypes.array.isRequired,
}

