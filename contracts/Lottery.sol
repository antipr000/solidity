// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.19;

contract Lottery {
    address public manager;
    address[] public players;

    constructor() {
        manager = msg.sender;
    }

    function enter() public payable {
        // Player should pay atleast 0.01 ether to enter lottery
        require(msg.value > .01 ether);

        players.push(msg.sender);
    }

    function randomNumberGenerator() private view returns (uint) {
        return
            uint(
                keccak256(
                    abi.encodePacked(block.difficulty, block.timestamp, players)
                )
            );
    }

    function pickWinner() public restricted {
        uint index = randomNumberGenerator() % players.length;

        // Winner is selected, transfer the total balance
        address payable winnderAddress = payable(players[index]);
        winnderAddress.transfer(address(this).balance);

        // Clear array for next round
        players = new address[](0);
    }

    function getAllParticipants() public view returns (address[] memory) {
        return players;
    }

    modifier restricted() {
        require(msg.sender == manager);
        _;
    }
}
