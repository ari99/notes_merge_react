import { connect } from 'react-redux'
import {MergeOutput} from '../components/MergeOutput'


const mapStateToProps = (state) => {
  return {
    text: state.merge.get('result').get('text')
  }
}

export const MergeOutputContainer = connect(
  mapStateToProps, 
  null
)(MergeOutput)

