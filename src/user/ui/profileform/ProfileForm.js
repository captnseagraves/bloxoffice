import React, { Component } from 'react'

class ProfileForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      eventName: this.props.eventName,
      eventDescription: this.props.eventDescription,
      eventLocation: this.props.eventLocation,
      imageURL: this.props.imageURL,
      quota: this.props.quota,
      ticketPrice: this.props.ticketPrice
    }
  }

  onNameChange(event) {
    this.setState({ eventName: event.target.value })
  }
  onDescriptionChange(event) {
    this.setState({ eventDescription: event.target.value })
  }
  onLocationChange(event) {
    this.setState({ eventLocation: event.target.value })
  }
  onImageChange(event) {
    this.setState({ imageURL: event.target.value })
  }
  onQuotaChange(event) {
    this.setState({ quota: event.target.value })
  }
  onTicketPriceChange(event) {
    this.setState({ ticketPrice: event.target.value })
  }

  handleSubmit(event) {
    event.preventDefault()
    //
    // if (this.state.name.length < 2)
    // {
    //   return alert('Please fill in your name.')
    // }

    this.props.onProfileFormSubmit(
      this.state.eventName,
      this.state.eventDescription,
      this.state.eventLocation,
      this.state.imageURL,
      this.state.quota,
      this.state.ticketPrice
    )
  }

  render() {
    return(
      <form className="pure-form pure-form-stacked" onSubmit={this.handleSubmit.bind(this)}>
        <fieldset>
          <label htmlFor="name">Event Name</label>
          <input id="eventName" type="text" value={this.state.eventName} onChange={this.onNameChange.bind(this)} placeholder="Event Name" />
          <input id="eventDescription" type="text" value={this.state.eventDescription} onChange={this.onDescriptionChange.bind(this)} placeholder="Event Description" />
          <input id="eventLocation" type="text" value={this.state.eventLocation} onChange={this.onLocationChange.bind(this)} placeholder="Event Location" />
          <input id="imageURL" type="text" value={this.state.imageURL} onChange={this.onImageChange.bind(this)} placeholder="Image URL" />
          <input id="quota" type="text" value={this.state.quota} onChange={this.onQuotaChange.bind(this)} placeholder="Number of Tickets Available" />
          <input id="ticketPrice" type="text" value={this.state.ticketPrice} onChange={this.onTicketPriceChange.bind(this)} placeholder="Ticket Price" />

          <br />

          <button type="submit" className="pure-button pure-button-primary">Update</button>
        </fieldset>
      </form>
    )
  }
}

export default ProfileForm
