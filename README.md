# Domain DApp

## Overview

**Domain DApp** is a decentralized application that allows users to list and purchase domain names on the Ethereum blockchain. The application supports both Ethereum Name Service (ENS) domains and traditional DNS-based domains, providing a flexible and secure marketplace for domain transactions.

## Features

- **Decentralized**: Operates on the Ethereum blockchain, ensuring transparency and security.
- **ENS Support**: Integrates with Ethereum Name Service for seamless domain management.
- **DNS Support**: Future integration with traditional DNS domains for broader coverage.
- **User-Friendly Interface**: Easy-to-use interface for listing and purchasing domains.
- **MetaMask Integration**: Connect and interact with the application using MetaMask.

## Prerequisites

Before setting up the project, ensure you have the following prerequisites installed:
```markdown

- **Node.js**: [Download and install Node.js](https://nodejs.org/).
- **MetaMask**: Install the MetaMask browser extension.
- **Git**: [Download and install Git](https://git-scm.com/).
```
## Setup and Installation

### Cloning the Repository

To get started, clone the repository:

```bash
git clone https://github.com/uv-goswami/domain_dapp_frontend.git
cd domain-dapp
```

### Installing Dependencies

Navigate to the project directory and install the necessary dependencies:

```bash
npm install
```

### Configuration

Ensure you have a `.env` file in your project directory for environment variables (if needed).

## Smart Contract Development

### Contract Structure

The smart contract manages domain registrations, listings, and purchases. Key functions include:

- **listDomain**: Allows users to list a domain for sale.
- **buyDomain**: Allows users to purchase a listed domain.
- **getDomainOwner**: Retrieves the owner of a domain.

### Key Functions

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DomainMarketplace {
    struct Domain {
        address owner;
        uint256 price;
        bool isListed;
    }

    mapping(string => Domain) public domains;

    function listDomain(string memory domainName, uint256 price) public {
        require(price > 0, "Price must be greater than zero");
        domains[domainName] = Domain(msg.sender, price, true);
    }

    function buyDomain(string memory domainName) public payable {
        Domain storage domain = domains[domainName];
        require(domain.isListed, "Domain not listed for sale");
        require(msg.value >= domain.price, "Insufficient funds");

        address previousOwner = domain.owner;
        domain.owner = msg.sender;
        domain.isListed = false;

        payable(previousOwner).transfer(msg.value);
    }

    function getDomainOwner(string memory domainName) public view returns (address) {
        return domains[domainName].owner;
    }
}
```

### Deployment

Deploy the smart contract on your local Hardhat node or a testnet.

```bash
npx hardhat run scripts/deploy.js --network localhost
```

## Frontend Development

### React Setup

Set up a React frontend to interact with the smart contract. Ensure you have installed the necessary dependencies:

```bash
cd frontend
npm install
```

### MetaMask Integration

Use `ethers.js` to integrate MetaMask for user authentication and transactions.

### User Interface Components

Create components for listing and buying domains, ensuring a user-friendly experience.

## Backend Development

### Server Setup

Use Express.js to set up your backend server and handle API requests.

```javascript
const express = require('express');
const ethers = require('ethers');
const app = express();
const port = 3000;

app.use(express.json());

const provider = new ethers.JsonRpcProvider('http://127.0.0.1:8545');
const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';
const contractABI = [ /* Replace with your contract ABI */ ];
const wallet = new ethers.Wallet('YOUR_PRIVATE_KEY', provider);
const contract = new ethers.Contract(contractAddress, contractABI, wallet);

app.post('/list-domain', async (req, res) => {
    const { domainName, price } = req.body;
    try {
        const tx = await contract.listDomain(domainName, ethers.parseEther(price));
        await tx.wait();
        res.status(200).send('Domain listed successfully!');
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.post('/buy-domain', async (req, res) => {
    const { domainName, price } = req.body;
    try {
        const tx = await contract.buyDomain(domainName, { value: ethers.parseEther(price) });
        await tx.wait();
        res.status(200).send('Domain purchased successfully!');
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
```

## Testing

### Unit Tests

Write unit tests for your smart contracts to ensure all functionalities work as expected.

### Integration Tests

Perform integration tests to ensure the frontend and backend interact correctly with the blockchain.

### Manual Testing

Manually test the DApp by listing and purchasing domains through the frontend.

## Deployment

### Local Deployment

Deploy the smart contract locally and interact with it through your frontend.

### Testnet Deployment

Deploy your smart contract to a testnet like Rinkeby or Goerli.

```bash
npx hardhat run scripts/deploy.js --network rinkeby
```

### Mainnet Deployment

Once tested, deploy your smart contract to the Ethereum mainnet.

## Ownership Verification (Future Work)

### ENS Integration

Integrate with Ethereum Name Service for blockchain-based domain verification.

### DNS Verification

Implement DNS verification for traditional domains using TXT records.

### Security Measures

Ensure all smart contract and frontend interactions are secure and free from vulnerabilities.

## User Guide

### Listing a Domain

1. Connect your MetaMask wallet.
2. Enter the domain name and price.
3. Click "List Domain" to list it for sale.

### Buying a Domain

1. Browse listed domains.
2. Select a domain and click "Buy Domain".
3. Confirm the transaction in MetaMask.

### Managing Domains

1. View your listed and purchased domains.
2. Manage domain settings and prices.

## Contributing

### Guidelines

- Contributions are welcome! Please fork the repository and create a pull request with your changes.

### Code of Conduct

- Follow the project's code of conduct to ensure a respectful and collaborative environment.

### Issue Reporting

- If you encounter any issues, please open an issue in the GitHub repository.

## License

### License Information

- This project is licensed under the MIT License.

---
