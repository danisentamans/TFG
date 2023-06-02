// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Migrations {
  address public owner;
  uint256 public last_completed_migration;

  constructor() {
    owner = msg.sender;
  }

  modifier restricted() {
    require(msg.sender == owner, "Restricted to owner");
    _;
  }

  function setCompleted(uint256 completed) public restricted {
    last_completed_migration = completed;
  }

  function upgrade(address newAddress) public restricted {
    Migrations upgraded = Migrations(newAddress);
    upgraded.setCompleted(last_completed_migration);
  }
}
