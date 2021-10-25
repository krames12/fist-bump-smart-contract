// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.4;

import "hardhat/console.sol";

contract FistBumpPortal {
  uint256 totalFistBumps;

  constructor() {
    console.log("I'm some sort of smart contract, at least in name");
  }

  function fistBump() public {
    totalFistBumps += 1;
    console.log("%s has fist bumped you!", msg.sender);
  }

  function getTotalFistBumps() public view returns (uint256) {
    console.log("We've been fist bumped %d times!", totalFistBumps);
    return totalFistBumps;
  }
}