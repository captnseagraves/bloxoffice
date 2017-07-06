var Ownable = artifacts.require("./zeppelin/ownership/Ownable.sol");
var Killable = artifacts.require("./zeppelin/lifecycle/Killable.sol");
var Authentication = artifacts.require("./Authentication.sol");
var UserEvent = artifacts.require("../build/contracts/UserEvent");
var EventCreator = artifacts.require("../build/contracts/EventCreator");
var MyToken = artifacts.require("../build/contracts/MyToken");


module.exports = function(deployer) {
  deployer.deploy(Ownable);
  deployer.link(Ownable, Killable);
  deployer.deploy(Killable);
  deployer.link(Killable, Authentication);
  deployer.deploy(Authentication);
  deployer.deploy(EventCreator);
  deployer.link(EventCreator, UserEvent);
  deployer.deploy(MyToken);
  deployer.link(MyToken, UserEvent);
  deployer.deploy(UserEvent);
};
