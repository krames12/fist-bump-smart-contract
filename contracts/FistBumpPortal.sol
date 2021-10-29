// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.4;

import "hardhat/console.sol";

contract FistBumpPortal {
  uint256 totalFistBumps;
  uint256 private seed;

  event NewFistBump(address indexed from, uint256 timestamp, string message);

  struct FistBump {
    address bumper;
    string message;
    uint256 timestamp;
  }

  FistBump[] fistBumps;

  constructor() payable {
    console.log("I'm some sort of smart contract, at least in name");

    seed = (block.timestamp + block.difficulty) % 100;
  }

  function fistBump(string memory _message) public {
    totalFistBumps += 1;
    console.log("%s has fist bumped you!", msg.sender);

    fistBumps.push(FistBump(msg.sender, _message, block.timestamp));

    seed = (block.timestamp + block.difficulty) % 100;

    if(seed <= 34) {
      console.log("%s won!", msg.sender);

      uint256 priceAmount = 0.00001 ether;
      require(
        priceAmount <= address(this).balance,
        "Trying to withdraw more money than the contract has"
      );

      (bool success, ) = (msg.sender).call{value: priceAmount}("");
      require(success, "Failed to withdraw money from contract.");
    }

    emit NewFistBump(msg.sender, block.timestamp, _message);
  }

  function getAllFistBumps() public view returns (FistBump[] memory) {
    return fistBumps;
  }

  function getTotalFistBumps() public view returns (uint256) {
    console.log("We've been fist bumped %d times!", totalFistBumps);
    return totalFistBumps;
  }
}