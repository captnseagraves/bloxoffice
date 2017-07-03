import AuthenticationContract from '../../../../build/contracts/EventCreator.json'
import store from '../../../store'

const contract = require('truffle-contract')

export const USER_UPDATED = 'USER_UPDATED'
function userUpdated(user) {
  return {
    type: USER_UPDATED,
    payload: user
  }
}

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

          console.log('hello');
          // console.log(instance);
          console.log(instance);
          console.log(instance.createEvent(500, 5, 'dance', 'move feet', 'Eldo', 'picture', {from: coinbase, gas: 900000}));


          console.log('event 1', instance.allEvents.length)

          console.log('number of events', instance.getContractCount());

          console.log('allEvents', 0xca02759ba292296134f06d8be7f7683bd0a79eda.buyTicket());



          authenticationInstance.createEvent.call(500, 5, 'dance', 'move feet', 'picture', {from: coinbase})
          .then(function(result) {
            // If no error, update user.

            // dispatch(userUpdated({"name": name}))
            console.log(result);
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
