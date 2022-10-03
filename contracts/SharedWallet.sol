// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract SharedWallet is Ownable {
    mapping(address => uint) public members;

    modifier ownerLimits(uint _amount) {
        require(isOwner() || members[msg.sender] >= _amount, "Not allowed!");
        _;
    }

    function isOwner() internal view returns(bool) {
        return owner() == msg.sender;
    }
     
    function addLimit(uint _limit, address _member) external {
        members[_member] = _limit;
    }

    function cutTheBalance(address _member, uint _amount) internal {
        members[_member] -= _amount;
    }

    function renounceOwnership() override public view onlyOwner {
        revert("Can't renounce!");
    }
}