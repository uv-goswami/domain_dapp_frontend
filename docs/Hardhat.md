# Hardhat

## What is Hardhat?

**Hardhat** is an Ethereum development environment that helps developers compile, deploy, test, and debug their decentralized applications (dApps). It provides a flexible and extensible framework to manage the entire development workflow.

## Why Use Hardhat?

Hardhat simplifies and automates many aspects of Ethereum development, making it easier to:

- **Compile Smart Contracts**: Automatically compile Solidity contracts.
- **Deploy Contracts**: Deploy contracts to different Ethereum networks with ease.
- **Run Tests**: Write and execute tests for smart contracts.
- **Debug Contracts**: Debug smart contracts with an integrated Solidity debugger.
- **Manage Complex Deployments**: Handle multiple deployments and migrations.

## Setting Up Hardhat

### Installation

To get started with Hardhat, follow these steps:

1. **Install Hardhat**:
   ```bash
   npm install --save-dev hardhat
   ```

2. **Create a Hardhat Project**:
   ```bash
   npx hardhat
   ```

   Follow the prompts to create a new Hardhat project. Choose the option to create a basic sample project, which will set up the necessary project structure and files.

### Project Structure

After creating a Hardhat project, your directory structure should look like this:

```
RealmDomains/
├── contracts/
│   └── DomainMarketplace.sol
├── scripts/
│   └── deploy.js
├── test/
│   └── sample-test.js
├── hardhat.config.js
└── (Other project files)
```

### Hardhat Configuration

The `hardhat.config.js` file is the main configuration file for your Hardhat project. Here's an example configuration for RealmDomains:

```javascript
require("@nomicfoundation/hardhat-waffle");
require("dotenv").config();

module.exports = {
  solidity: "0.8.0",
  networks: {
    rinkeby: {
      url: process.env.INFURA_PROJECT_URL,
      accounts: [process.env.PRIVATE_KEY]
    }
  }
};
```

## Key Concepts

### Compiling Smart Contracts

**Compiling** is the process of converting Solidity code into bytecode that can be executed on the Ethereum Virtual Machine (EVM). Hardhat uses the Solidity compiler to compile contracts.

**Steps**:
1. Place your Solidity contracts in the `contracts/` directory.
2. Run the following command to compile:
   ```bash
   npx hardhat compile
   ```

The compiled artifacts, including the bytecode and ABI, will be stored in the `artifacts/` directory.

### Deploying Smart Contracts

**Deploying** is the process of sending the compiled contract bytecode to the Ethereum network, making it available at a specific address.

**Steps**:
1. Create a deployment script in the `scripts/` directory.
2. Write a script to deploy the contract. Example for `DomainMarketplace.sol`:
   ```javascript
   async function main() {
     const [deployer] = await ethers.getSigners();
     console.log("Deploying contracts with the account:", deployer.address);

     const balance = await deployer.getBalance();
     console.log("Account balance:", balance.toString());

     const DomainMarketplace = await ethers.getContractFactory("DomainMarketplace");
     const domainMarketplace = await DomainMarketplace.deploy();
     console.log("DomainMarketplace address:", domainMarketplace.address);
   }

   main()
     .then(() => process.exit(0))
     .catch((error) => {
       console.error(error);
       process.exit(1);
     });
   ```
3. Run the deployment script:
   ```bash
   npx hardhat run scripts/deploy.js --network rinkeby
   ```

### Writing and Running Tests

**Testing** is an essential part of the development process to ensure that contracts behave as expected. Hardhat uses Mocha and Chai for writing tests.

**Steps**:
1. Create test files in the `test/` directory.
2. Write tests using the Hardhat testing environment. Example:
   ```javascript
   const { expect } = require("chai");

   describe("DomainMarketplace", function () {
     it("Should list and buy domains", async function () {
       const [owner, buyer] = await ethers.getSigners();

       const DomainMarketplace = await ethers.getContractFactory("DomainMarketplace");
       const domainMarketplace = await DomainMarketplace.deploy();
       await domainMarketplace.deployed();

       await domainMarketplace.listDomain("exampledomain.eth", ethers.parseEther("1"));
       const domain = await domainMarketplace.getDomain("exampledomain.eth");
       expect(domain.name).to.equal("exampledomain.eth");
       expect(domain.price).to.equal(ethers.parseEther("1"));
       expect(domain.owner).to.equal(owner.address);
       expect(domain.forSale).to.be.true;

       await domainMarketplace.connect(buyer).buyDomain("exampledomain.eth", { value: ethers.parseEther("1") });
       const updatedDomain = await domainMarketplace.getDomain("exampledomain.eth");
       expect(updatedDomain.owner).to.equal(buyer.address);
       expect(updatedDomain.forSale).to.be.false;
     });
   });
   ```

3. Run the tests:
   ```bash
   npx hardhat test
   ```

### Debugging Smart Contracts

Hardhat includes a powerful debugger that allows you to debug smart contract execution. To debug a transaction:

1. Run a local Ethereum node with Hardhat:
   ```bash
   npx hardhat node
   ```

2. Use the Hardhat console to inspect transactions:
   ```bash
   npx hardhat console
   ```

## Advanced Hardhat Features

### Using Plugins

Hardhat supports a variety of plugins to extend its functionality. Some popular plugins include:

- **@nomiclabs/hardhat-waffle**: For integrating Hardhat with Waffle, a testing framework for Ethereum smart contracts.
- **@nomiclabs/hardhat-ethers**: For integrating Hardhat with Ethers.js.
- **@nomiclabs/hardhat-etherscan**: For verifying contracts on Etherscan.

To install and use a plugin, follow the plugin's documentation for installation and configuration instructions.

### Managing Networks

Hardhat makes it easy to manage multiple networks for deployment and testing. You can configure network settings in `hardhat.config.js` and use them in your deployment scripts.

**Example Configuration**:
```javascript
networks: {
  rinkeby: {
    url: process.env.INFURA_PROJECT_URL,
    accounts: [process.env.PRIVATE_KEY]
  },
  mainnet: {
    url: process.env.INFURA_PROJECT_URL,
    accounts: [process.env.PRIVATE_KEY]
  }
}
```

### Tasks and Scripts

Hardhat allows you to define custom tasks and scripts to automate your workflow. You can define tasks in `hardhat.config.js` and run them with the Hardhat CLI.

**Example Task**:
```javascript
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();
  for (const account of accounts) {
    console.log(account.address);
  }
});

module.exports = {};
```

Run the task:
```bash
npx hardhat accounts
```

## Conclusion

Hardhat is a powerful and flexible development environment for Ethereum that simplifies the process of building, testing, and deploying smart contracts. By using Hardhat in the RealmDomains project, we ensure a streamlined and efficient workflow for developing and managing our decentralized domain marketplace.
