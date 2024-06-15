// SPDX-License-Identifier: MIT

pragma solidity >=0.8.0 <0.9.0;

contract Vending{
    address payable public owner; 
    mapping(address => uint) public balances;

    constructor() {
        owner = payable(msg.sender);
        balances[address(this)]= 1000;
    }

        modifier onlyOwner(){
        require(msg.sender == owner,"Only the owner can retock vending machine");
        _;
    }

    function purchase() public payable{
        uint amount = msg.value / (10 ** 18);
        require(amount >= 1, "You must pay at least 1 ether");
        require(balances[address(this)] >= amount,"Not enough in stock to fulfill purchase request");
        balances[address(this)] -= amount;
        balances[msg.sender] += amount;

    }

    function restock(uint amount) public onlyOwner {
        balances[address(this)] += amount;
    }

    function getBalance()public view returns(uint){
        return balances[address(this)];
    }

    function withdraw() external onlyOwner{
        owner.transfer(address(this).balance);
    }

}