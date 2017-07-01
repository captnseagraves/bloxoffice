pragma solidity ^0.4.8;

/*Need to write fallback function*/


contract EventCreator {

  /*index of created events*/
  address[] public allEvents;

  function getContractCount()
  public
  constant
  returns(uint contractCount)
 {
   return allEvents.length;
 }

  function createEvent(uint quota, uint ticketPrice, string eventName, string eventDescription) public returns (address newUserEvent) {
    UserEvent ue = new UserEvent(quota, ticketPrice, eventName, eventDescription);
    allEvents.push(ue);
    return ue;
  }
  /*function createEvent(uint quota, uint ticketPrice, bytes32 eventName, bytes32 eventDescription) returns (UserEvent eventAddress) {
  return new UserEvent(quota, ticketPrice, eventName, eventDescription);
  }*/

  /*function createEvent() returns (UserEvent eventAddress) {
    EventData[eventID] = EventData.length;
    return new UserEvent(100, 5, 'dance', 'move feet');
  }*/
}

contract UserEvent {

  /*Need to create Array of tickets based on quota*/
  EventCreator creator;
  mapping (address => uint) public registrantsPaid;
  uint public numRegistrants = 0;
  uint public eventName;
  uint public quota;
  uint public ticketPrice;
  uint public eventDescription;
  address public organizer;

  event Deposit(address _from, uint _amount);  // so you can log these events
  event Refund(address _to, uint _amount);

  function UserEvent(uint _quota, uint _ticketPrice, bytes32 _eventName, bytes32 _eventDescription) {
    organizer = msg.sender;
    quota = _quota;
    ticketPrice = _ticketPrice;
    eventName = _eventName;
    eventDescription = _eventDescription;
  }

  /*function something(
    address one,
    address two,
    address three)
  constant
  doSomething(one, two, msg.sender)
  payable returns (bool) {

  }*/

  function () payable {
    if (numRegistrants >= quota)
      throw;

    if (_amountPaid != ticketPrice)
      throw;

    registrantsPaid[msg.sender] = msg.value;
    numRegistrants++;
    Deposit(msg.sender, msg.value);
    // send a percentage to EventCreator
  }

  /*UserEvent(0x01023012123123).buyTicket();
  UserEvent(0x01023012123123).sendTransaction('buyTicket');*/

  /*Need to send user ticket*/
  function buyTicket(address _purchaser, uint _amountPaid) payable public returns (bool success) {
    if (numRegistrants >= quota) { return false; }
    if (_amountPaid < ticketPrice) { return false; }
    registrantsPaid[_purchaser] = _amountPaid;
    numRegistrants++;
    Deposit(_purchaser, _amountPaid);
    return true;
  }

  // maybe only increaseQuota
  function changeQuota(uint newquota) public {
    if (msg.sender != organizer) { return; }
    quota = newquota; // what happens when this is lower?
  }

  /*bool reentrancy;

  modifier noRentrancy {
    if (reentrancy == true)
      throw;

    reentrancy = true;

  }*/

  function refundTicket(address recipient, uint amount) public {
    if (msg.sender != organizer) { return; }
    if (registrantsPaid[recipient] == amount) {
      address myAddress = this;
      if (myAddress.balance >= amount) {
        if (!recipient.transfer(amount))
          throw; // determine the difference with send, guards against reentrancy?

        registrantsPaid[recipient] = 0;
        numRegistrants--;
        Refund(recipient, amount);
      }
    }
  }
  function destroy() { // so funds not locked in contract forever
    if (msg.sender == organizer) {
      selfdestruct(organizer); // send funds to organizer
    }
  }
}
