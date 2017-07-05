import { connect } from 'react-redux'
import ProfileForm from './ProfileForm'
import { updateUser } from './ProfileFormActions'

const mapStateToProps = (state, ownProps) => {
  return {
    eventName: state.eventName,
    transactionObject: state.user.transactionObject
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onProfileFormSubmit: (eventName, eventDescription, eventLocation, imageURL, quota, ticketPrice) => {
      event.preventDefault();

      dispatch(updateUser(eventName, eventDescription, eventLocation, imageURL, quota, ticketPrice))
    }
  }
}

const ProfileFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileForm)

export default ProfileFormContainer
