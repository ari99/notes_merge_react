import { connect } from 'react-redux'
import {Merge} from '../components/Merge'


const mapStateToProps = (state, ownProps) => {
  return {
    isAuthenticated: state.auth.get('isAuthenticated')
  }
}


export const MergeContainer = connect(
  mapStateToProps,
  null
)(Merge)

