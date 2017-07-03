import React, { Component } from 'react'
import { Link } from 'react-router'
import createEventForm from './createEventForm'


class CreateEvent extends Component {
  constructor(props, { authData }) {
    super(props)
    authData = this.props
  }

  clickHandler(event) {
  console.log('were here');
}

  render() {
    console.log(this.props.authData);
    return(
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1-1">
          <h1>Create a new event</h1>
          <createEventForm />
          </div>
        </div>

      </main>
    )
  }
}

export default CreateEvent
