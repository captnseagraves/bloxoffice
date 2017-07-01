import React, { Component } from 'react'

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
          <input id="eventName" placeholder="Event Name"></input><br></br>
          <input id="eventDescription"placeholder="Event Description"></input><br></br>
          <input id="eventLocation"placeholder="Event Location"></input><br></br>
          <input id="imageURL"placeholder="Image URL"></input><br></br>
          <input id="quota"placeholder="Capacity - Number Of Tickets To Create"></input><br></br>
          <input id="ticketPrice"placeholder="Ticket Price"></input><br></br>
          <button onClick={this.clickHandler.bind(this)} type="button" name="button">Create Event</button>
          </div>
        </div>
      </main>
    )
  }
}

export default CreateEvent
