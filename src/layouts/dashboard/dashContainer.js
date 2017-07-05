import { connect } from 'react-redux'
import ProfileForm from './Dashboard'
import { updateUser } from './dashActions'

const mapStateToProps = (state, ownProps) => {
  return {
    eventName: state.eventName,
    transactionObject: state.user.transactionObject
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onProfileFormSubmit: () => {
      event.preventDefault();

      dispatch(updateUser())
    }
  }
}

const dashContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard)

export default dashContainer
