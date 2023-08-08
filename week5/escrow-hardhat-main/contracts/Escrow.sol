// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

contract Escrow {
    event Approved(uint approvedBalance);

    address public depositor;
    address public beneficiary;
    address public arbiter;
    bool public isApproved = false;


    constructor(address _arbiter, address _beneficiary) payable {
        arbiter = _arbiter;
        beneficiary = _beneficiary;
        depositor = msg.sender;
    }

    function approve() external {
        require(msg.sender == arbiter , "Only the arbiter can approve");
        uint contractBalance = address(this).balance;
        (bool sent,) = beneficiary.call{ value: address(this).balance }("");
        require(sent , "Failed to send ether");
        isApproved = true;
        emit Approved(contractBalance);
    }
}