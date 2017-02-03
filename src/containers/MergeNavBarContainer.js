import { connect } from 'react-redux'
import {MergeNavBar} from '../components/MergeNavBar'
import {authLogout} from '../actions/authLogin'
import {clearMergeForm} from '../actions/mergeForm'
import {updateNavActiveKey} from '../actions/nav'

const mapStateToProps = (state, ownProps) => {

  return {
    isAuthenticated: state.auth.get('isAuthenticated'),
    navActiveKey: state.navActiveKey
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {

  return {
    handleSelect: (eventKey, event) => {
      dispatch(updateNavActiveKey(eventKey))
      if(eventKey === 3){
        dispatch(authLogout())
      }else if (eventKey === 1){
        dispatch(clearMergeForm())
      }
    }
  }
}

export const MergeNavBarContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MergeNavBar)

