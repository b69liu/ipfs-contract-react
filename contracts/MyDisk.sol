// SPDX-License-Identifier: MIT

pragma solidity ^0.8.1;

contract MyDisk {
    mapping(address => mapping(string => string)) disk;

    function saveCid(string calldata filename, string calldata cid) public {
        disk[msg.sender][filename] = cid;
    }

    function getCid(string calldata filename)
        public
        view
        returns (string memory)
    {
        return disk[msg.sender][filename];
    }
}
