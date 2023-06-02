const Micontrato = artifacts.require('Micontrato');

module.exports = function(deployer) {
  deployer.deploy(Micontrato, 'MyToken', 'MTK', 18, 1000000);
};
