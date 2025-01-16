# Deployment

## Introduction

Deploying your application is a critical step in bringing your project to life. In the RealmDomains project, deployment involves deploying smart contracts to the Ethereum network, deploying the backend server, and deploying the frontend application. This document provides detailed instructions on how to deploy each component and best practices for ensuring a successful deployment.

## Table of Contents

- [Introduction](#introduction)
- [Deploying Smart Contracts](#deploying-smart-contracts)
  - [Prerequisites](#prerequisites)
  - [Deployment Script](#deployment-script)
  - [Deploying to a Testnet](#deploying-to-a-testnet)
  - [Deploying to the Mainnet](#deploying-to-the-mainnet)
- [Deploying the Backend Server](#deploying-the-backend-server)
  - [Setting Up the Server](#setting-up-the-server)
  - [Configuring Environment Variables](#configuring-environment-variables)
  - [Starting the Server](#starting-the-server)
- [Deploying the Frontend Application](#deploying-the-frontend-application)
  - [Building the Frontend](#building-the-frontend)
  - [Deploying to a Hosting Service](#deploying-to-a-hosting-service)
- [Best Practices](#best-practices)
- [Conclusion](#conclusion)

## Deploying Smart Contracts

### Prerequisites

Before deploying smart contracts, ensure you have the following prerequisites:

- **Node.js**: Ensure you have Node.js installed. [Download Node.js](https://nodejs.org/)
- **Hardhat**: Ensure you have Hardhat installed in your project. [Hardhat Documentation](https://hardhat.org/)
- **Ethereum Wallet**: Ensure you have an Ethereum wallet with sufficient funds for deployment (e.g., MetaMask).
- **Infura Account**: Ensure you have an Infura account and project for connecting to the Ethereum network. [Infura](https://infura.io/)

### Deployment Script

Create a deployment script in the `scripts` directory to deploy your smart contracts:

**scripts/deploy.js**:
```javascript
async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  const balance = await deployer.getBalance();
  console.log("Account balance:", ethers.utils.formatEther(balance));

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

### Deploying to a Testnet

Deploy your smart contracts to a testnet (e.g., Rinkeby) for testing:

1. **Configure Hardhat**: Ensure your `hardhat.config.js` is configured to use the testnet:
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

2. **Deploy the Contract**: Run the deployment script:
   ```bash
   npx hardhat run scripts/deploy.js --network rinkeby
   ```

### Deploying to the Mainnet

Once you have tested your contracts on a testnet and are confident in their functionality, you can deploy them to the Ethereum mainnet:

1. **Configure Hardhat**: Ensure your `hardhat.config.js` is configured to use the mainnet:
   ```javascript
   require("@nomicfoundation/hardhat-waffle");
   require("dotenv").config();

   module.exports = {
     solidity: "0.8.0",
     networks: {
       mainnet: {
         url: process.env.INFURA_PROJECT_URL,
         accounts: [process.env.PRIVATE_KEY]
       }
     }
   };
   ```

2. **Deploy the Contract**: Run the deployment script:
   ```bash
   npx hardhat run scripts/deploy.js --network mainnet
   ```

## Deploying the Backend Server

### Setting Up the Server

To deploy the backend server, you'll need a hosting provider (e.g., AWS, Heroku, DigitalOcean). Follow the provider's instructions to set up a server instance.

### Configuring Environment Variables

Create a `.env` file on the server and add the necessary environment variables:

```
INFURA_PROJECT_URL=https://mainnet.infura.io/v3/your-project-id
CONTRACT_ADDRESS=0xYourContractAddress
PRIVATE_KEY=your-private-key
PORT=3000
```

### Starting the Server

1. **Install Dependencies**: SSH into your server and navigate to your project directory. Install the dependencies:
   ```bash
   npm install
   ```

2. **Start the Server**: Start the backend server:
   ```bash
   node backend/server.js
   ```

Consider using a process manager like PM2 to manage the server process:
```bash
npm install -g pm2
pm2 start backend/server.js
```

## Deploying the Frontend Application

### Building the Frontend

Build the frontend application for production:

```bash
cd frontend
npm run build
```

This will create a `build` directory containing the production-ready frontend files.

### Deploying to a Hosting Service

Choose a hosting service for your frontend application (e.g., Netlify, Vercel, AWS S3, GitHub Pages). Follow the hosting service's instructions to deploy the contents of the `build` directory.

**Example: Deploying to Netlify**:
1. **Login to Netlify**: Go to [Netlify](https://www.netlify.com/) and log in to your account.
2. **Create a New Site**: Click "New site from Git" and connect your GitHub repository.
3. **Configure Build Settings**: Set the build command to `npm run build` and the publish directory to `frontend/build`.
4. **Deploy**: Click "Deploy site" to deploy your frontend application.

## Best Practices

1. **Test Thoroughly**: Ensure you have thoroughly tested your application on testnets before deploying to the mainnet.
2. **Monitor and Log**: Use monitoring and logging tools to keep track of your application's performance and identify any issues.
3. **Backup**: Regularly backup your data and configurations to prevent data loss in case of failures.
4. **Security**: Follow security best practices to protect your application and user data. Refer to the [Security documentation](docs/Security.md) for details.

## Conclusion

Deploying the RealmDomains project involves deploying smart contracts to the Ethereum network, deploying the backend server, and deploying the frontend application. By following the steps and best practices outlined in this document, you can ensure a smooth and successful deployment of your project.
