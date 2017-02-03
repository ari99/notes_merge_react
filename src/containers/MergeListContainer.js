import { connect } from 'react-redux'
import {MergeList} from '../components/MergeList'

const mapStateToProps = (state) => {
  return {
    mergeList: state.mergeList
  }
}



export const MergeListContainer = connect(
  mapStateToProps,
  null
)(MergeList)

