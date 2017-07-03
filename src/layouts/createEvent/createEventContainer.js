import { connect } from 'react-redux'
import CreateEventForm from './createEvent'
import { signUpUser } from './createEventActions'

const mapStateToProps = (state, ownProps) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    onCreateEventFormSubmit: (name) => {
      event.preventDefault();

      dispatch(createEventForm(name))
    }
  }
}

const createEventFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateEventForm)

export default createEventFormContainer
