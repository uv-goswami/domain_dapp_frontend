# RealmDomains

## Introduction

Welcome to the RealmDomains project! RealmDomains is a decentralized domain marketplace built on the Ethereum blockchain. It allows users to list, buy, and manage domain names in a secure and transparent manner. This document provides an overview of the project, including instructions for setting up the development environment, deploying smart contracts, and using the application.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Project Structure](#project-structure)
- [Setup and Installation](#setup-and-installation)
- [Deploying Smart Contracts](#deploying-smart-contracts)
- [Running the Application](#running-the-application)
- [Documentation](#documentation)
- [Contributing](#contributing)
- [License](#license)

## Features

- Decentralized domain marketplace on the Ethereum blockchain.
- List domains for sale with a specified price.
- Buy listed domains and transfer ownership securely.
- View and manage domain listings.
- Connect Ethereum wallet (e.g., MetaMask) for blockchain interactions.

## Project Structure

```
RealmDomains/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   └── ConnectWallet.jsx
│   │   │   └── ListDomain.jsx
│   │   │   └── DomainList.jsx
│   │   │   └── ViewListing.jsx
│   │   ├── context/
│   │   │   └── Web3Context.js
│   │   ├── styles/
│   │   │   └── GlobalStyle.js
│   │   ├── App.jsx
│   │   ├── index.js
│   └── package.json
├── backend/
│   └── server.js
├── contracts/
│   └── DomainMarketplace.sol
├── scripts/
│   └── deploy.cjs
├── docs/
│   ├── Contributing.md
│   ├── CodeOfConduct.md
│   ├── Testing.md
│   ├── Deployment.md
│   ├── Usage.md
│   ├── ListDomain.jsx.md
│   ├── JavaScript.md
│   ├── Web3Context.md
│   ├── App.jsx.md
│   ├── ConnectWallet.jsx.md
│   ├── ViewListing.jsx.md
│   ├── DomainMarketplace.sol.md
│   └── deploy.cjs.md
├── hardhat.config.js
└── package.json
```

## Setup and Installation

### Prerequisites

- Node.js and npm: [Download and install Node.js](https://nodejs.org/)
- Ethereum wallet (e.g., MetaMask): [Install MetaMask](https://metamask.io/)
- Infura account: [Sign up for Infura](https://infura.io/)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/RealmDomains.git
   cd RealmDomains
   ```

2. Install dependencies for the frontend and backend:
   ```bash
   cd frontend
   npm install
   cd ../backend
   npm install
   ```

3. Create a `.env` file in the root directory and add the necessary environment variables:
   ```plaintext
   INFURA_PROJECT_URL=https://rinkeby.infura.io/v3/your-infura-project-id
   PRIVATE_KEY=your-private-key
   CONTRACT_ADDRESS=0xYourContractAddress
   PORT=3000
   ```

## Deploying Smart Contracts

To deploy the smart contracts to the Ethereum network, follow these steps:

1. Configure the `hardhat.config.js` file with the network settings:
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

2. Run the deployment script:
   ```bash
   npx hardhat run scripts/deploy.cjs --network rinkeby
   ```

3. Note the deployed contract address and update the `.env` file with the `CONTRACT_ADDRESS`.

## Running the Application

To run the frontend and backend servers, follow these steps:

1. Start the backend server:
   ```bash
   cd backend
   node server.js
   ```

2. Start the frontend application:
   ```bash
   cd frontend
   npm start
   ```

## Documentation

Detailed documentation for the components, scripts, and smart contracts is available in the `docs` directory. Here are some key documents:

- [Contributing.md](docs/Contributing.md): A guide for contributors to get involved with the RealmDomains project.
- [CodeOfConduct.md](docs/CodeOfConduct.md): The code of conduct for the RealmDomains community.
- [Testing.md](docs/Testing.md): Instructions on how to write and run tests for the RealmDomains project.
- [Deployment.md](docs/Deployment.md): Detailed steps for deploying the RealmDomains platform.
- [Usage.md](docs/Usage.md): Instructions on how to use the RealmDomains platform.
- [ListDomain.jsx.md](docs/ListDomain.jsx.md): Detailed explanation of the `ListDomain.jsx` component.
- [JavaScript.md](docs/JavaScript.md): An overview of JavaScript and its usage in the RealmDomains project.
- [Web3Context.md](docs/Web3Context.md): Detailed explanation of the `Web3Context` implementation.
- [App.jsx.md](docs/App.jsx.md): Detailed explanation of the `App.jsx` component.
- [ConnectWallet.jsx.md](docs/ConnectWallet.jsx.md): Detailed explanation of the `ConnectWallet.jsx` component.
- [ViewListing.jsx.md](docs/ViewListing.jsx.md): Detailed explanation of the `ViewListing.jsx` component.
- [DomainMarketplace.sol.md](docs/DomainMarketplace.sol.md): Detailed explanation of the `DomainMarketplace.sol` smart contract.
- [deploy.cjs.md](docs/deploy.cjs.md): Detailed explanation of the `deploy.cjs` deployment script.

## Contributing

We welcome contributions to the RealmDomains project! To contribute, follow these steps:

1. Fork the repository.
2. Create a new branch for your changes:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Make your changes and commit them with a descriptive commit message:
   ```bash
   git add .
   git commit -m "Add feature: description of your feature"
   ```
4. Push your changes to your forked repository:
   ```bash
   git push origin feature/your-feature-name
   ```
5. Create a pull request to the original repository and describe your changes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
