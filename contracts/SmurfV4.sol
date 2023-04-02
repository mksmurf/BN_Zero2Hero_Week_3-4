// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./SmurfV2.sol";

contract SmurfV4 is SmurfV2{
    string private name;
    //string public allowedName;
    event NameChanged(string name);
    function setName(string memory _name) public {
        name = _name;
        emit NameChanged(name);
    }


    function getName() public view returns (string memory) {
       return string(abi.encodePacked(name));
    }
}