import React, { Component } from 'react'
import { Link } from 'react-router'
import AuthenticationContract from '../../../build/contracts/UserEvent.json'
import store from '../../store'

const contract = require('truffle-contract')

export function updateUser(name) {
  let web3 = store.getState().web3.web3Instance

  // Double-check web3's status.
  if (typeof web3 !== 'undefined') {

    return function(dispatch) {
      // Using truffle-contract we create the authentication object.
      const authentication = contract(AuthenticationContract)
      authentication.setProvider(web3.currentProvider)

      // Declaring this for later so we can chain functions on Authentication.
      var authenticationInstance

      // Get current ethereum wallet.
      web3.eth.getCoinbase((error, coinbase) => {
        // Log errors, if any.
        if (error) {
          console.error(error);
        }

        authentication.deployed().then(function(instance) {
          authenticationInstance = instance
          // Attempt to login user.


          console.log(authentication.at('0x7755978ec177dd03f83dfcccc4d26454328734db').eventName.call());

          //
          instance.createEvent(500, 5, 'dance', 'move feet', 'Eldo', 'picture', {from: coinbase, gas: 900000}).then(function(result){
            console.log(result);
            localStorage.setItem('Event', result.logs[1].address)


            return alert('Event Create!')
          })
          .catch(function(result) {
            // If error...
          })
        })
      })
    }
  } else {
    console.error('Web3 is not initialized.');
  }
}


class Dashboard extends Component {
  constructor(props, { authData }) {
    super(props)
    authData = this.props
  }

ComponentWillMount(){
  updateUser()
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
