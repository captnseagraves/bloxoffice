import AuthenticationContract from '../../../build/contracts/UserEvent.json'
import store from '../../store'


const contract = require('truffle-contract')

var ticketPrice = localStorage.getItem('ticketPrice')

export const TICKET_PURCHASED = 'TICKET_PURCHASED'
function userUpdated(transaction) {
  console.log('TICKET_PURCHASED');
  return {
    type: TICKET_PURCHASED,
    data: transaction
  }
}

export function updateUser() {
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
          console.log('inside the blockchain');
          console.log('instance', instance);

          instance.send({from: coinbase, value: ticketPrice}).then(function(result){

            console.log('result', result);


            return dispatch(userUpdated(result));
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
