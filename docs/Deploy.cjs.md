# deploy.cjs

## Introduction

The `deploy.cjs` script is a Node.js script used for deploying smart contracts to the Ethereum blockchain. It leverages Hardhat, a development environment for Ethereum, to compile and deploy the contracts. This document provides a detailed explanation of the purpose, logic, and implementation of the `deploy.cjs` script.

## Purpose

The primary purpose of the `deploy.cjs` script is to automate the deployment process of smart contracts. It compiles the smart contracts, deploys them to the specified Ethereum network, and provides the necessary information, such as contract addresses, to the user.

## Implementation

### Project Structure

The `deploy.cjs` script is located in the `scripts` directory of the project.

```
RealmDomains/
├── frontend/
├── backend/
├── contracts/
│   └── DomainMarketplace.sol
├── scripts/
│   └── deploy.cjs
├── hardhat.config.js
└── package.json
```

### Script Code

**deploy.cjs**:

```javascript
const { ethers } = require('hardhat');

async function main() {
  // Retrieve the deployer's account address
  const [deployer] = await ethers.getSigners();
  console.log('Deploying contracts with the account:', deployer.address);

  // Check the deployer's account balance
  const balance = await deployer.getBalance();
  console.log('Account balance:', ethers.utils.formatEther(balance));

  // Compile and deploy the DomainMarketplace contract
  const DomainMarketplace = await ethers.getContractFactory('DomainMarketplace');
  const domainMarketplace = await DomainMarketplace.deploy();
  await domainMarketplace.deployed();

  // Output the contract address
  console.log('DomainMarketplace contract deployed to:', domainMarketplace.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
```
- **Import Statement**:
  - `ethers`: The Ethers.js library is imported from Hardhat. It provides utilities for interacting with the Ethereum blockchain, including deploying contracts.

- **Main Function**:
  - `async function main() { ... }`: Defines the main asynchronous function that handles the deployment process.

```javascript
  // Retrieve the deployer's account address
  const [deployer] = await ethers.getSigners();
  console.log('Deploying contracts with the account:', deployer.address);
```
- **Retrieve Deployer's Account**:
  - `await ethers.getSigners()`: Retrieves the list of signers (accounts) available in the Hardhat environment. The first account is used as the deployer.
  - `deployer`: The account that will deploy the contracts.
  - `console.log(...)`: Logs the deployer's account address to the console.

```javascript
  // Check the deployer's account balance
  const balance = await deployer.getBalance();
  console.log('Account balance:', ethers.utils.formatEther(balance));
```
- **Check Account Balance**:
  - `await deployer.getBalance()`: Retrieves the balance of the deployer's account in Wei (the smallest unit of Ether).
  - `ethers.utils.formatEther(balance)`: Converts the balance from Wei to Ether.
  - `console.log(...)`: Logs the deployer's account balance to the console.

```javascript
  // Compile and deploy the DomainMarketplace contract
  const DomainMarketplace = await ethers.getContractFactory('DomainMarketplace');
  const domainMarketplace = await DomainMarketplace.deploy();
  await domainMarketplace.deployed();
```
- **Compile and Deploy Contract**:
  - `await ethers.getContractFactory('DomainMarketplace')`: Compiles the `DomainMarketplace` contract and returns a contract factory for deploying new instances of the contract.
  - `await DomainMarketplace.deploy()`: Deploys a new instance of the `DomainMarketplace` contract.
  - `await domainMarketplace.deployed()`: Waits for the deployment transaction to be mined and the contract to be fully deployed.

```javascript
  // Output the contract address
  console.log('DomainMarketplace contract deployed to:', domainMarketplace.address);
```
- **Log Contract Address**:
  - `console.log(...)`: Logs the deployed contract's address to the console.

```javascript
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
```
- **Execute Main Function**:
  - `main().then(() => process.exit(0)).catch((error) => { ... })`: Executes the main function. If the function completes successfully, the process exits with a status code of 0. If an error occurs, the error is logged, and the process exits with a status code of 1.

## Usage

To run the `deploy.cjs` script and deploy the smart contracts, use the following command:

```bash
npx hardhat run scripts/deploy.cjs --network <network-name>
```
- **Example**: Deploying to the Rinkeby testnet:
  ```bash
  npx hardhat run scripts/deploy.cjs --network rinkeby
  ```

Ensure that the network configuration is properly set up in the `hardhat.config.js` file and that you have the necessary environment variables (e.g., Infura project URL, private key) configured.

### Example Configuration

**hardhat.config.js**:
```javascript
require('@nomiclabs/hardhat-waffle');
require('dotenv').config();

module.exports = {
  solidity: '0.8.0',
  networks: {
    rinkeby: {
      url: process.env.INFURA_PROJECT_URL,
      accounts: [process.env.PRIVATE_KEY],
    },
  },
};
```
- **Network Configuration**:
  - `rinkeby`: Configures the Rinkeby testnet with the Infura project URL and deployer's private key from environment variables.

## Conclusion

The `deploy.cjs` script automates the deployment process of smart contracts for the RealmDomains project. It compiles the contracts, deploys them to the specified Ethereum network, and logs the necessary information, such as contract addresses. This document covers the implementation details and usage of the `deploy.cjs` script, providing a streamlined way to manage contract deployments.
