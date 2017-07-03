
import React, { Component } from 'react'

class CreateEventForm extends Component {
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
          <label htmlFor="name">Name</label>
          <input id="name" type="text" value={this.state.name} onChange={this.onInputChange.bind(this)} placeholder="Name" />
          <span className="pure-form-message">This is a required field.</span>

          <br />

          <button type="submit" className="pure-button pure-button-primary">Sign Up</button>
        </fieldset>
      </form>
    )
  }
}

export default CreateEventForm


    // <main className="container">
    //   <div className="pure-g">
    //     <div className="pure-u-1-1">
    //     <h1>Create a new event</h1>
    //       <form className="pure-form pure-form-stacked" onSubmit={this.handleSubmit.bind(this)}>
    //     <input id="eventName" placeholder="Event Name"></input><br></br>
    //     <input id="eventDescription"placeholder="Event Description"></input><br></br>
    //     <input id="eventLocation"placeholder="Event Location"></input><br></br>
    //     <input id="imageURL"placeholder="Image URL"></input><br></br>
    //     <input id="quota"placeholder="Capacity - Number Of Tickets To Create"></input><br></br>
    //     <input id="ticketPrice"placeholder="Ticket Price"></input><br></br>
    //     <button onClick={this.clickHandler.bind(this)} type="button" name="button">Create Event</button>
    //       </form>
    //     </div>
    //   </div>
    // </main>
