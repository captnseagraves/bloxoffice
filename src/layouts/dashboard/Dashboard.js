import React, { Component } from 'react'
import { Link } from 'react-router'
import { updateUser } from './dashActions'
import { connect } from 'react-redux'


const contract = require('truffle-contract')

class Dashboard extends Component {
  constructor(props, { authData }) {
    super(props)
    authData = this.props

  this.state = {
    eventName: '',
    eventDescription: '',
    eventLocation: '',
    imageURL: '',
    quota: '',
    ticketPrice: '',
    userWallet: '',
    contractAddress: '',
    transactionAddress: '',
    blockHash: '',
    hasSubmitted: false
  }
}

clickHandler(event) {
  event.preventDefault()

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


componentWillMount(){
  this.setState({
    eventName: localStorage.getItem('eventName'),
    eventDescription: localStorage.getItem('eventDescription'),
    eventLocation: localStorage.getItem('eventLocation'),
    imageURL: localStorage.getItem('imageURL'),
    quota: localStorage.getItem('quota'),
    ticketPrice: localStorage.getItem('ticketPrice'),
    userWallet: localStorage.getItem('coinbase'),
    contractAddress: localStorage.getItem('contractAddress'),
    transactionAddress: localStorage.getItem('transactionAddress'),
    blockHash: localStorage.getItem('blockHash')
  })
}

renderSubmitInfo(){
  if(this.state.hasSubmitted == true){
    return (
      <div>
      <h1 className="green">Ticket purchased! Have fun at {this.state.eventName}!</h1>
      <p>Contract Address: {this.state.contractAddress}</p>
      <p>Ticket Purchased from Wallet Address: {this.state.userWallet}</p>
      <p> Transaction Address: {this.state.blockHash}</p>
      </div>
    )
  } else {
    return(
      <div></div>
    )
  }
}

  render() {
    console.log('dashprops', this.props);

    return(
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1-1">


          <div className="col-sm-6 col-md-4 col-lg-3 mt-4 text-center">
              <div className="card">
              <h1 className="moveCenter marginTopBottom">Buy Tickets</h1>
              <div className="borderCenter">
                  <img className="card-img-top" src={this.state.imageURL}></img><br></br>
                  <div className="card-block">
                      <h1 className="card-title mt-3">{this.state.eventName}</h1>
                      <p>Where: {this.state.eventLocation}</p>
                      <p>What: {this.state.eventDescription}</p>
                      <div className="card-text">
                        <p>Ticket Price: {this.state.ticketPrice} ETH</p>
                        <p>Tickets available: {this.state.quota}</p>
                      </div>
                    </div>
                  </div>
                  <div className="moveCenter marginTopBottom">
                  {this.renderSubmitInfo()}
                  <button onClick={this.clickHandler.bind(this)} type="button" name="buyTicket" className="pure-button pure-button-primary">Purchase Ticket</button>
                  </div>
              </div>
          </div>


          </div>
        </div>

      </main>
    )
  }
}


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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard)
