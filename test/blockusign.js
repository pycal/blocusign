var BlockUSign = artifacts.require("./BlockUSign.sol");

contract('BlockUSign', function(accounts) {

  it("minting should work", function() {
    return BlockUSign.deployed().then(function(instance) {
      blockUSignInstance = instance;

      return blockUSignInstance.createDocument("123", accounts[1], {from: accounts[0]});
    }).then(function() {
      return blockUSignInstance.storedData.call();
    }).then(function(storedData) {
      assert.equal(storedData, 89, "The value 89 was not stored.");
    });
  });

});
