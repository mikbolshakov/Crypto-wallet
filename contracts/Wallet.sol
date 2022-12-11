// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Wallet {
    address owner;
    mapping(address => uint) public members; // address => remaining limit

    event MoneyWithdrawn(address indexed to, uint amount);
    event MoneyReceived(address indexed from, uint amount);

    modifier onlyOwner() {
        require(owner == msg.sender, "not an owner");
        _;
    }

    modifier ownerOrMember(uint amount) {
        require(owner == msg.sender || members[msg.sender] >= amount, "can't withdraw");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function payMoney() public payable {}

    function addLimit(address _member, uint _limit) public onlyOwner {
        members[_member] = _limit;
    }

    function getBalance() public view returns (uint) {
        return address(this).balance;
    }

    function withdrawMoney(uint amount) public ownerOrMember(amount) {
        require(amount <= address(this).balance, "Not enough funds to withdraw!");
        if (owner != msg.sender) {
            reduceTheLimit(msg.sender, amount);
        }
        address payable _to = payable(msg.sender);
        _to.transfer(amount);

        emit MoneyWithdrawn(_to, amount);
    }

    function reduceTheLimit(address _member, uint amount) internal {
        members[_member] -= amount;
    }

    function deleteFromMembers(address _member) public onlyOwner {
        delete members[_member];
    }

    fallback() external payable {}

    receive() external payable {
        emit MoneyReceived(msg.sender, msg.value);
    }
}
