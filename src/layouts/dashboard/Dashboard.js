import React, { Component } from 'react'

class Dashboard extends Component {
  constructor(props, { authData }) {
    super(props)
    authData = this.props
  }

  render() {
    console.log(this.props.authData);
    return(
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1-1">
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
