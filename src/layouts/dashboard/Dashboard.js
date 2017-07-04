import React, { Component } from 'react'
import { Link } from 'react-router'
import UserEvent from '../../../build/contracts/UserEvent.json'

class Dashboard extends Component {
  constructor(props, { authData }) {
    super(props)
    authData = this.props
  }

  clickHandler(event) {
  console.log('were here');
}

  render() {
    console.log(this.props.authData);
      console.log(UserEvent.at('0x7755978ec177dd03f83dfcccc4d26454328734db').eventName.call());
    return(
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1-1">
          <h1>Create a new event</h1>

          <button><Link to="/createEvent" className="pure-menu-link">Create New Event</Link></button>

            <h1>Dashboard</h1>
            <p><strong>Congratulations {this.props.authData.name}!</strong> If you're seeing this page, you've logged in with your own smart contract successfully.</p>
          </div>
          <div className="pure-u-1-1">
          <h1>Search field will be here</h1>
            <h1>Events</h1>
            <p>Click on an event to see more and purchase tickets!</p>
            <p>Events will be listed here</p>
          </div>
        </div>

      </main>
    )
  }
}

export default Dashboard
