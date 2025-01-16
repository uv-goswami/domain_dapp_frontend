# RealmDomains

## Introduction

**RealmDomains** is a decentralized platform built on the Ethereum blockchain that allows users to list, buy, and manage domain names securely and transparently. Our platform leverages the power of blockchain technology to provide a user-friendly experience for managing your digital assets.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
  - [Listing a Domain](#listing-a-domain)
  - [Buying a Domain](#buying-a-domain)
- [Directory Structure](#directory-structure)
- [Documentation](#documentation)
  - [Introduction](docs/Introduction.md)
  - [Hardhat](docs/Hardhat.md)
  - [Node.js](docs/Node.md)
  - (Add other links here)
- [Contributing](#contributing)
- [Support](#support)
- [License](#license)

## Features

- **Decentralized Domain Management**: Complete control over your domains without reliance on centralized authorities.
- **Secure Transactions**: Transactions are securely handled on the Ethereum blockchain, ensuring trust and transparency.
- **User-Friendly Interface**: An intuitive and easy-to-use interface for both beginners and advanced users.
- **Scalability**: Seamless scalability to handle an increasing number of users and transactions.
- **Transparency**: All transactions are publicly verifiable on the blockchain, promoting transparency and trust.

## Getting Started

### Prerequisites

Before you begin, ensure you have met the following requirements:

- **Node.js**: Version 14.x or above. [Download Node.js](https://nodejs.org/)
- **NPM**: Version 6.x or above. NPM comes with Node.js.
- **Hardhat**: For smart contract development and deployment. [Hardhat Documentation](https://hardhat.org/)
- **Ethereum Wallet**: Such as MetaMask for managing your digital assets. [MetaMask](https://metamask.io/)

### Installation

Follow these steps to set up the project locally:

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/RealmDomains.git
   cd RealmDomains
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Create a `.env` file in the root directory and add the following variables:
   ```
   INFURA_PROJECT_URL=<Your Infura Project URL>
   CONTRACT_ADDRESS=<Your Deployed Contract Address>
   PRIVATE_KEY=<Your Ethereum Private Key>
   PORT=3000
   ```

4. **Deploy the Smart Contract**:
   ```bash
   npx hardhat run scripts/deploy.js --network your-preferred-network
   ```

5. **Run the Backend Server**:
   ```bash
   node backend/server.cjs
   ```

6. **Launch the Frontend Application**:
   ```bash
   cd frontend
   npm start
   ```

## Usage

### Listing a Domain

To list a domain, send a POST request to the `/list-domain` endpoint with the domain name and price.

**Example**:
```bash
curl -X POST http://localhost:3000/list-domain -H "Content-Type: application/json" -d '{"domainName": "exampledomain.eth", "price": "1"}'
```

### Buying a Domain

To buy a domain, send a POST request to the `/buy-domain` endpoint with the domain name and price.

**Example**:
```bash
curl -X POST http://localhost:3000/buy-domain -H "Content-Type: application/json" -d '{"domainName": "exampledomain.eth", "price": "1"}'
```

## Directory Structure

```
RealmDomains/
├── contracts/
│   └── DomainMarketplace.sol
├── frontend/
│   └── (Your frontend application files)
├── backend/
│   └── server.cjs
├── scripts/
│   └── deploy.js
├── test/
│   └── (Test files)
├── docs/
│   ├── Introduction.md
│   ├── Hardhat.md
│   ├── Node.md
│   └── (Other documentation files)
├── .env
├── .gitignore
├── README.md
└── package.json
```

## Documentation

For detailed information on the project's components, tools, and setup, refer to the following documentation:

- [Introduction](docs/Introduction.md)
- [Hardhat](docs/Hardhat.md)
- [Node.js](docs/Node.md)
- (Add other links here)

## Contributing

We welcome contributions from the community! Whether it's reporting a bug, suggesting an improvement, or submitting a pull request, your input helps make RealmDomains better. Check out our [Contributing Guide](docs/Contributing.md) for more details.

## Support

If you have any questions or need assistance, feel free to reach out to our community on [Discord](link-to-discord) or [GitHub Issues](link-to-github-issues). We're here to help!

## License

RealmDomains is open-source software licensed under the [MIT License](LICENSE).

---
