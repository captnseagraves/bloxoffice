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

          // console.log('hello');
          // // console.log(instance);
          // console.log('instance', instance);
          // instance.createEvent(500, 5, 'dance', 'move feet', 'Eldo', 'picture', {from: coinbase, gas: 900000}).then(function(result){
          //   console.log(result);
          // })

          // console.log('number of events', instance.getContractCount());

          // authentication.at('0x749ebd7bd9099cc50b9c290ee8f59601f4a61c74').then(function(instance2){
          //   console.log(instance2);
          // })

          console.log(authentication.at('0x7755978ec177dd03f83dfcccc4d26454328734db').eventName.call());

          //
          instance.createEvent(500, 5, 'dance', 'move feet', 'Eldo', 'picture', {from: coinbase, gas: 900000}).then(function(result){
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
