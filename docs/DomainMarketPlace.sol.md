# DomainMarketplace.sol

## Introduction

The `DomainMarketplace.sol` smart contract is the core component of the RealmDomains platform. It manages the listing, buying, and ownership of domain names on the Ethereum blockchain. This document provides a detailed explanation of the purpose, logic, and implementation of the `DomainMarketplace.sol` smart contract.

## Purpose

The primary purpose of the `DomainMarketplace.sol` smart contract is to provide a decentralized marketplace for domain names. It allows users to list their domains for sale, purchase listed domains, and manage ownership records in a secure and transparent manner.

## Implementation

### Project Structure

The `DomainMarketplace.sol` smart contract is located in the `contracts` directory of the project.

```
RealmDomains/
├── frontend/
├── backend/
├── contracts/
│   └── DomainMarketplace.sol
├── scripts/
├── hardhat.config.js
└── package.json
```

### Smart Contract Code

**DomainMarketplace.sol**:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract DomainMarketplace is ReentrancyGuard {
    using SafeMath for uint256;

    struct Domain {
        string name;
        uint256 price;
        address owner;
        bool forSale;
    }

    mapping(string => Domain) public domains;

    modifier onlyOwner(string memory name) {
        require(domains[name].owner == msg.sender, "Not the domain owner");
        _;
    }

    event DomainListed(string name, uint256 price, address owner);
    event DomainBought(string name, uint256 price, address buyer);

    function listDomain(string memory name, uint256 price) public {
        require(price > 0, "Price must be greater than zero");
        domains[name] = Domain(name, price, msg.sender, true);
        emit DomainListed(name, price, msg.sender);
    }

    function buyDomain(string memory name) public payable nonReentrant {
        Domain storage domain = domains[name];
        require(domain.forSale, "Domain not for sale");
        require(msg.value >= domain.price, "Insufficient payment");

        address payable seller = payable(domain.owner);
        seller.transfer(msg.value);

        domain.owner = msg.sender;
        domain.forSale = false;
        emit DomainBought(name, domain.price, msg.sender);
    }

    function getDomain(string memory name) public view returns (Domain memory) {
        return domains[name];
    }
}
```

### Breakdown of the Implementation

1. **License and Solidity Version**:
   ```solidity
   // SPDX-License-Identifier: MIT
   pragma solidity ^0.8.0;
   ```
   - **License**: The contract is licensed under the MIT License, a permissive open-source license.
   - **Solidity Version**: The Solidity compiler version is specified as `^0.8.0`. This ensures that the contract is compiled with Solidity 0.8.0 or higher, taking advantage of the latest features and security improvements.

2. **Imports**:
   ```solidity
   import "@openzeppelin/contracts/utils/math/SafeMath.sol";
   import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
   ```
   - **SafeMath**: A library from OpenZeppelin used for safe arithmetic operations to prevent overflow and underflow. This is crucial because arithmetic errors can lead to vulnerabilities in smart contracts.
   - **ReentrancyGuard**: A contract from OpenZeppelin used to prevent reentrancy attacks. Reentrancy is a common vulnerability where an external contract can repeatedly call back into the original contract before the initial execution is complete, potentially causing unexpected behavior or draining funds.

3. **Contract Definition**:
   ```solidity
   contract DomainMarketplace is ReentrancyGuard {
       using SafeMath for uint256;
   ```
   - **Contract Inheritance**: The `DomainMarketplace` contract inherits from `ReentrancyGuard`, gaining its reentrancy protection functionality.
   - **SafeMath Library**: The `SafeMath` library is used for safe arithmetic operations on `uint256` values. By using `SafeMath`, the contract ensures that all arithmetic operations are safe from overflow and underflow, preventing potential vulnerabilities.

4. **Domain Structure**:
   ```solidity
   struct Domain {
       string name;
       uint256 price;
       address owner;
       bool forSale;
   }
   ```
   - **Domain Struct**: The `Domain` struct defines the properties of a domain:
     - `name`: The name of the domain.
     - `price`: The price of the domain in Wei (the smallest unit of Ether).
     - `owner`: The address of the current owner of the domain.
     - `forSale`: A boolean indicating whether the domain is currently for sale.

5. **Mapping of Domains**:
   ```solidity
   mapping(string => Domain) public domains;
   ```
   - **Mapping**: A mapping is used to store domains by their name. The mapping associates a domain name (string) with its corresponding `Domain` struct. The `public` keyword makes the mapping accessible externally, allowing anyone to view the details of a domain by its name.

6. **Modifier for Owner-Only Actions**:
   ```solidity
   modifier onlyOwner(string memory name) {
       require(domains[name].owner == msg.sender, "Not the domain owner");
       _;
   }
   ```
   - **OnlyOwner Modifier**: The `onlyOwner` modifier ensures that certain actions can only be performed by the owner of the domain. It checks if the sender of the transaction is the owner of the specified domain. If the sender is not the owner, the transaction is reverted with the message "Not the domain owner". The `_` symbol represents the continuation of the function where the modifier is applied.

7. **Events**:
   ```solidity
   event DomainListed(string name, uint256 price, address owner);
   event DomainBought(string name, uint256 price, address buyer);
   ```
   - **DomainListed**: Emitted when a domain is listed for sale. The event includes the domain name, price, and owner address.
   - **DomainBought**: Emitted when a domain is bought. The event includes the domain name, price, and buyer address. Events are used to log important actions and can be listened to by off-chain applications to track contract activity.

8. **List Domain Function**:
   ```solidity
   function listDomain(string memory name, uint256 price) public {
       require(price > 0, "Price must be greater than zero");
       domains[name] = Domain(name, price, msg.sender, true);
       emit DomainListed(name, price, msg.sender);
   }
   ```
   - **listDomain Function**: Allows a user to list a domain for sale.
   - **Price Validation**: Ensures that the price is greater than zero to prevent zero-value listings.
   - **Update Mapping**: Adds the domain to the `domains` mapping with the specified name, price, and owner (msg.sender). The `forSale` property is set to `true`.
   - **Emit Event**: Emits the `DomainListed` event to log the listing.

9. **Buy Domain Function**:
   ```solidity
   function buyDomain(string memory name) public payable nonReentrant {
       Domain storage domain = domains[name];
       require(domain.forSale, "Domain not for sale");
       require(msg.value >= domain.price, "Insufficient payment");

       address payable seller = payable(domain.owner);
       seller.transfer(msg.value);

       domain.owner = msg.sender;
       domain.forSale = false;
       emit DomainBought(name, domain.price, msg.sender);
   }
   ```
   - **buyDomain Function**: Allows a user to buy a listed domain.
   - **Domain Retrieval**: Retrieves the domain from the `domains` mapping using the specified name.
   - **Sale Validation**: Ensures that the domain is for sale and the payment is sufficient.
   - **Transfer Payment**: Transfers the payment to the seller (current owner) using `seller.transfer(msg.value)`. The `payable` keyword allows the address to receive Ether.
   - **Update Ownership**: Updates the owner of the domain to the buyer (msg.sender) and sets `forSale` to `false`.
   - **Emit Event**: Emits the `DomainBought` event to log the purchase.

10. **Get Domain Function**:
    ```solidity
    function getDomain(string memory name) public view returns (Domain memory) {
        return domains[name];
    }
    ```
    - **getDomain Function**: Allows users to retrieve the details of a domain by its name.
    - **Public View Function**: The function is marked as `public` and `view`, indicating that it does not modify the state and can be called externally.
    - **Return Domain**: Returns the `Domain` struct associated with the specified domain name.

## Conclusion

The `DomainMarketplace.sol` smart contract is the backbone of the RealmDomains platform, enabling the listing, buying, and management of domain names on the Ethereum blockchain. It ensures secure and transparent transactions while maintaining the integrity of ownership records. This document covers the implementation details and functionality of the `DomainMarketplace.sol` smart contract, providing a comprehensive overview of its purpose and logic.
