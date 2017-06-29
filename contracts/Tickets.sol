pragma solidity ^0.4.8;

/*Need to write fallback function*/

contract Event {
  address public organizer;
  mapping (address => uint) public registrantsPaid;
  uint public numRegistrants;
  uint public quota;
  uint public ticketPrice;
  uint public eventDescription;


  event Deposit(address _from, uint _amount);  // so you can log these events
  event Refund(address _to, uint _amount);

  function Event() { // Constructor
    organizer = msg.sender;
    quota = 500;
    numRegistrants = 0;

  }
  function buyTicket(address _purchaser, uint _amountPaid) payable public returns (bool success) {
    if (numRegistrants >= quota) { return false; }
    if (_amountPaid < ticketPrice) { return false; }
    registrantsPaid[_purchaser] = _amountPaid;
    numRegistrants++;
    Deposit(_purchaser, _amountPaid);
    return true;
  }
  function changeQuota(uint newquota) public {
    if (msg.sender != organizer) { return; }
    quota = newquota;
  }
  function refundTicket(address recipient, uint amount) public {
    if (msg.sender != organizer) { return; }
    if (registrantsPaid[recipient] == amount) {
      address myAddress = this;
      if (myAddress.balance >= amount) {
        recipient.transfer(amount);
        registrantsPaid[recipient] = 0;
        numRegistrants--;
        Refund(recipient, amount);
      }
    }
  }
  function destroy() { // so funds not locked in contract forever
    if (msg.sender == organizer) {
      suicide(organizer); // send funds to organizer
    }
  }
}
