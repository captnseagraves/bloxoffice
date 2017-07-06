pragma solidity ^0.4.8;

/*Need to write fallback function*/


contract MyToken {
    /* This creates an array with all balances */
    mapping (address => uint256) public balanceOf;

    /* Initializes contract with initial supply tokens to the creator of the contract */
    function BloxToken(
        uint256 initialSupply
        ) {
        balanceOf[this] = initialSupply;              // Give the creator all initial tokens
    }

    /* Send coins */
    function transfer(address _to, uint256 _value) {
        if (balanceOf[this] < _value) throw;           // Check if the sender has enough
        if (balanceOf[_to] + _value < balanceOf[_to]) throw; // Check for overflows
        balanceOf[this] -= _value;                     // Subtract from the sender
        balanceOf[_to] += _value;                            // Add the same to the recipient
    }
}

contract EventCreator {

  /*index of created events*/
  address[] public allEvents;

  event createContract(address _from, string _eventName);

  function getAllEvents()
  public
  constant
  returns(address[] allEvents)
 {
   return allEvents;
 }

  function getContractCount()
  public
  constant
  returns(uint contractCount)
 {
   return allEvents.length;
 }
}

contract UserEvent is MyToken {

  /*Need to create Array of tickets based on quota*/

  UserEvent creator;
  mapping (address => uint) public registrantsPaid;
  address public organizer;
  uint public numRegistrants = 0;
  uint public quota;
  uint public ticketPrice;
  string public eventName;
  string public eventDescription;
  string public eventLocation;
  string public imageURL;


  event newEvent(address _from, string _eventName);

  event Deposit(address _from, uint _amount);  // so you can log these events
  event Refund(address _to, uint _amount);

  function createEvent(
    uint _quota,
    uint _ticketPrice,
    string _eventName,
    string _eventDescription,
    string _eventLocation,
    string _imageURL)
    {
    organizer = msg.sender;
    quota = _quota;
    ticketPrice = _ticketPrice;
    eventName = _eventName;
    eventDescription = _eventDescription;
    eventLocation = _eventLocation;
    imageURL = _imageURL;
    /*EventCreator.allEvents.push(this);*/
    newEvent(this, eventName);
    MyToken.BloxToken(quota);
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

    if (msg.value != ticketPrice)
      throw;

    registrantsPaid[msg.sender] = msg.value;
    MyToken.transfer(msg.sender, 1);
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
        /*if (!recipient.transfer(amount))
          throw; // determine the difference with send, guards against reentrancy?*/

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
