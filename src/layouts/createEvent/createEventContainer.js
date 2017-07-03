import { connect } from 'react-redux'
import createEventForm from './createEvent'
import { signUpUser } from './createEventActions'

const mapStateToProps = (state, ownProps) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSignUpFormSubmit: (name) => {
      event.preventDefault();

      dispatch(signUpUser(name))
    }
  }
}

const SignUpFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(createEventForm)

export default SignUpFormContainer
