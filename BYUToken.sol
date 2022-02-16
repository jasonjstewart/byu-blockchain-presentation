// contracts/GLDToken.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract BYUToken is ERC20 {
    constructor() ERC20("BYUToken", "BYU") {
        owner=msg.sender;
    }

    //state
    address[] students;
    mapping(string => address) studentsAddress;
    address owner;

    //functions
    function addStudent(string memory name) public {
        students.push(msg.sender);
        studentsAddress[name] = msg.sender;
    }

    function getAddressForStudent(string memory name) public view returns(address){
        return studentsAddress[name];
    }

    function payAllStudents() public {
        require(msg.sender==owner,"Must be owner to pay all the students");
        _mint(address(this), students.length);
        for (uint256 index = 0; index < students.length; index++) {
            transfer(students[index], 1);
        }
    }
}