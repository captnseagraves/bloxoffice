import AuthenticationContract from '../../../../build/contracts/UserEvent.json'
import store from '../../../store'


const contract = require('truffle-contract')

export const USER_UPDATED = 'USER_UPDATED'
function userUpdated(user) {
  return {
    type: USER_UPDATED,
    payload: user
  }
}

export function updateUser(eventName, eventDescription, eventLocation, imageURL, quota, ticketPrice) {
  let web3 = store.getState().web3.web3Instance
  console.log(eventName, eventDescription, eventLocation, imageURL, quota, ticketPrice);

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
          console.log(authentication.at('0x7755978ec177dd03f83dfcccc4d26454328734db').eventDescription.call());
          console.log(authentication.at('0x7755978ec177dd03f83dfcccc4d26454328734db').eventLocation.call());
          console.log(authentication.at('0x7755978ec177dd03f83dfcccc4d26454328734db').imageURL.call());
          console.log(authentication.at('0x7755978ec177dd03f83dfcccc4d26454328734db').quota.call());
          console.log(authentication.at('0x7755978ec177dd03f83dfcccc4d26454328734db').ticketPrice.call());

          //
          instance.createEvent(quota, ticketPrice, eventName, eventDescription, eventLocation, imageURL, {from: coinbase, gas: 900000}).then(function(result){
            console.log(result);

            localStorage.setItem('eventName', 'test')
            localStorage.setItem('eventDescrtiption', eventDescription)
            localStorage.setItem('eventLocation', eventLocation)
            localStorage.setItem('imageURL', imageURL)
            localStorage.setItem('quota', quota)
            localStorage.setItem('ticketPrice', ticketPrice)


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
