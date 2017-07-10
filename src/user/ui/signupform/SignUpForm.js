import React, { Component } from 'react'

class SignUpForm extends Component {
  constructor(props) {
    super(props)
console.log("sign up super", super());
    this.state = {
      name: ''
    }
  }

  onInputChange(event) {
    this.setState({ name: event.target.value })
  }

  handleSubmit(event) {
    event.preventDefault()

    if (this.state.name.length < 2)
    {
      return alert('Please fill in your name.')
    }
    console.log(this.props);
    this.props.onSignUpFormSubmit(this.state.name)
  }

  render() {
    return(
      <form className="pure-form pure-form-stacked" onSubmit={this.handleSubmit.bind(this)}>
        <fieldset>
        <div className="moveCenter">
        <div className="borderCenter signupInput">
          <label htmlFor="name">Name</label>
          <div className="pure-g">
          <div className="pure-1-3">
          </div>
          <div className="pure-1-3 moveCenter">
          <input className="moveCenter" id="name" type="text" value={this.state.name} onChange={this.onInputChange.bind(this)} />
            </div>
            <div className="pure-1-3">
            </div>
          </div>
          <span className="pure-form-message">This is a required field.</span>
          </div>
          </div>
          <br />

          <button type="submit" className="pure-button pure-button-primary">Sign Up</button>
        </fieldset>
      </form>
    )
  }
}

export default SignUpForm
