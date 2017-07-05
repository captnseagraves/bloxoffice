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
      ticketPrice: this.props.ticketPrice,
      hasSubmitted: false,
      userWallet: ''
    }
  }

  componentWillMount(){
    this.setState({
      userWallet: localStorage.getItem('coinbase'),
    })
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
    this.setState({
      hasSubmitted: true
    })

    this.props.onProfileFormSubmit(
      this.state.eventName,
      this.state.eventDescription,
      this.state.eventLocation,
      this.state.imageURL,
      this.state.quota,
      this.state.ticketPrice
    )
  }

renderSubmitInfo(){
  console.log('props again', this.props);
  if(this.state.hasSubmitted == true && !this.props.transactionObject){
    return (
      <div>
      <h1 className="yellow">Your event transaction is pending...</h1>
      </div>
    )
  } else if (this.state.hasSubmitted == true && this.props.transactionObject) {
    return(
    <div>
    <h1 className="green">Event has been successfully created!</h1>
    <p>Contract Address: {this.props.transactionObject.logs[0].address}</p>
    <p>Contract Deployed From Wallet Address: {this.state.userWallet} </p>
    <p> Transaction Address: {this.props.transactionObject.receipt.transactionHash}</p>
    </div>
  )
  } else {
    return(
      <div></div>
    )
  }
}

  render() {
    console.log('props', this.props);
    console.log('state', this.state);
    return(
      <form className="pure-form pure-form-stacked" onSubmit={this.handleSubmit.bind(this)}>
        <fieldset>
        <div className="moveCenter">
        <h1>Create New Event</h1>
        </div>
        <div className="moveCenter">
        <div className="borderCenter marginTopBottom inputForm">
        <div className="pure-g">
        <div className="pure-1-2">
          <label htmlFor="eventName" className="label">Event Name</label>
          <input className="inputMargin" id="eventName" type="text" value={this.state.eventName} onChange={this.onNameChange.bind(this)} />
          </div>
          <br></br>
          <div className="pure-1-2">

          <label htmlFor="eventDescription" className="label">Event Description</label>
          <input id="eventDescription" type="text" value={this.state.eventDescription} onChange={this.onDescriptionChange.bind(this)} />

          </div>
          </div>
          <br></br>
          <div className="pure-g">
          <div className="pure-1-2">
          <label htmlFor="eventLocation" className="label">Event Location</label>
          <input className="inputMargin" id="eventLocation" type="text" value={this.state.eventLocation} onChange={this.onLocationChange.bind(this)}  />
          </div>
          <br></br>
          <div className="pure-1-2">
          <label htmlFor="Image URL" className="label">Event Image URL</label>
          <input id="imageURL" type="text" value={this.state.imageURL} onChange={this.onImageChange.bind(this)} />
          </div>
          </div>
          <br></br>
          <div className="pure-g">
          <div className="pure-1-2">
          <label htmlFor="quota" className="label">Number of Tickets</label>
          <input className="inputMargin" id="quota" type="text" value={this.state.quota} onChange={this.onQuotaChange.bind(this)}  />
          </div>
          <br></br>
          <div className="pure-1-2">
          <label htmlFor="ticketPrice" className="label">Price of Ticket in ETH</label>
          <input id="ticketPrice" type="text" value={this.state.ticketPrice} onChange={this.onTicketPriceChange.bind(this)} />
          </div>
          </div>
          <br></br>
          </div>
        </div>
          <div className="moveCenter">
          {this.renderSubmitInfo()}
          <button type="submit" className="pure-button pure-button-primary moveCenter">Create Event</button>
          </div>
        </fieldset>
      </form>
    )
  }
}

export default ProfileForm
