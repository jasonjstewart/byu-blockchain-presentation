// contracts/GLDToken.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract BYUToken is ERC20 {
    constructor() ERC20("BYUToken", "BYU") {
        owner=msg.sender;
        _mint(msg.sender, 1000000000);
    }

    function decimals() public view virtual override returns (uint8) {
        return 0;
    }

    //state
    address[] students;
    mapping(string => address) studentsAddress;
    address public owner;
    uint256 payment=1;

    //functions
    function addStudent(string memory name) public {
        require(studentsAddress[name]==address(0), "Name already used, try a different name.");
        students.push(msg.sender);
        studentsAddress[name] = msg.sender;
    }

    function getAddressForStudent(string memory name) public view returns(address){
        return studentsAddress[name];
    }

    function payAllStudents() public {
        require(msg.sender==owner,"Must be owner to pay all the students");
        for (uint256 index = 0; index < students.length; index++) {
            transfer(students[index], 1);
        }
    }
}