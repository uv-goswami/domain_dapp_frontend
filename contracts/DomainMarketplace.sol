// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DomainMarketplace {
    struct Domain {
        string name;
        uint256 price;
        address owner;
        bool forSale;
    }

    mapping(string => Domain) public domains;

    function listDomain(string memory name, uint256 price) public {
        require(price > 0, "Price must be greater than zero");
        domains[name] = Domain(name, price, msg.sender, true);
    }

    function buyDomain(string memory name) public payable {
        Domain storage domain = domains[name];
        require(domain.forSale, "Domain not for sale");
        require(msg.value >= domain.price, "Insufficient payment");

        address payable seller = payable(domain.owner);
        seller.transfer(msg.value);

        domain.owner = msg.sender;
        domain.forSale = false;
    }

    function getDomain(string memory name) public view returns (Domain memory) {
        return domains[name];
    }
}
