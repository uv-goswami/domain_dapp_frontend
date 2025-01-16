# Ethers.js

## What is Ethers.js?

**Ethers.js** is a library that provides a complete and easy-to-use API for interacting with the Ethereum blockchain and its ecosystem. It was originally designed to be a compact library for the browser, but it has since become one of the most widely used libraries for Ethereum development.

## Why Use Ethers.js?

Ethers.js is widely used for the following reasons:

- **Simplicity**: Provides a simple and intuitive API for interacting with the Ethereum blockchain.
- **Comprehensiveness**: Supports a wide range of functionalities, including wallet management, smart contract interactions, and blockchain queries.
- **Modularity**: Designed to be modular, allowing developers to use only the parts they need.
- **Security**: Implements best practices for secure key management and transaction signing.
- **Compatibility**: Works seamlessly with both browser and Node.js environments.

## Key Features of Ethers.js

1. **Wallet Management**:
   - Create, import, and manage Ethereum wallets.
   - Sign transactions and messages with private keys.
   - Connect to hardware wallets like Ledger and Trezor.

2. **Smart Contract Interactions**:
   - Deploy smart contracts to the Ethereum network.
   - Call smart contract functions and handle contract events.
   - Encode and decode contract data.

3. **Blockchain Queries**:
   - Query blockchain state, including account balances, transaction details, and block information.
   - Listen for and handle blockchain events.
   - Interact with various Ethereum nodes and providers.

4. **Utilities**:
   - Comprehensive set of utilities for working with Ethereum addresses, private keys, and transaction data.
   - Support for ENS (Ethereum Name Service) for resolving human-readable names to Ethereum addresses.

## Setting Up Ethers.js

### Installation

To get started with Ethers.js, follow these steps:

1. **Install Ethers.js**:
   ```bash
   npm install ethers
   ```

2. **Import Ethers.js in Your Project**:
   - For Node.js:
     ```javascript
     const { ethers } = require('ethers');
     ```
   - For Browser (using a bundler like Webpack or Rollup):
     ```javascript
     import { ethers } from 'ethers';
     ```

## Using Ethers.js in RealmDomains

### Project Structure

Create the following directory structure for the backend server with Ethers.js:

```
RealmDomains/
├── backend/
│   └── server.js
├── .env
├── package.json
└── (Other project files)
```

### Backend Server Code

**backend/server.js**:
```javascript
const express = require('express');
const { ethers } = require('ethers');
const dotenv = require('dotenv');
const contractABI = require('../artifacts/contracts/DomainMarketplace.sol/DomainMarketplace.json').abi;

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const provider = new ethers.JsonRpcProvider(process.env.INFURA_PROJECT_URL);
const contractAddress = process.env.CONTRACT_ADDRESS;
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
const contract = new ethers.Contract(contractAddress, contractABI, wallet);

app.use((req, res, next) => {
  console.log(`Received request: ${req.method} ${req.url}`);
  console.log('Request body:', req.body);
  next();
});

app.post('/list-domain', async (req, res, next) => {
  const { domainName, price } = req.body;
  try {
    const parsedPrice = ethers.parseEther(price);
    const tx = await contract.listDomain(domainName, parsedPrice);
    await tx.wait();
    res.status(200).send({ message: 'Domain listed successfully!' });
  } catch (error) {
    console.error("Error listing domain:", error);
    next(error);
  }
});

app.post('/buy-domain', async (req, res, next) => {
  const { domainName, price } = req.body;
  try {
    const parsedPrice = ethers.parseEther(price);
    const tx = await contract.buyDomain(domainName, { value: parsedPrice });
    await tx.wait();
    res.status(200).send({ message: 'Domain purchased successfully!' });
  } catch (error) {
    console.error("Error buying domain:", error);
    next(error);
  }
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({
    error: {
      code: err.code || 500,
      message: err.message || 'Internal Server Error',
    }
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
```

### Key Functions in Ethers.js

#### Creating and Managing Wallets

**Creating a Wallet**:
```javascript
const wallet = ethers.Wallet.createRandom();
console.log('Address:', wallet.address);
console.log('Private Key:', wallet.privateKey);
```

**Importing a Wallet**:
```javascript
const privateKey = 'your-private-key-here';
const wallet = new ethers.Wallet(privateKey);
console.log('Address:', wallet.address);
```

**Connecting to a Provider**:
```javascript
const provider = new ethers.JsonRpcProvider(process.env.INFURA_PROJECT_URL);
const walletWithProvider = wallet.connect(provider);
```

#### Deploying Smart Contracts

**Deploying a Contract**:
```javascript
const contractFactory = new ethers.ContractFactory(contractABI, contractBytecode, walletWithProvider);
const contract = await contractFactory.deploy();
console.log('Contract Address:', contract.address);
```

#### Interacting with Smart Contracts

**Calling a Function**:
```javascript
const result = await contract.someFunction();
console.log('Result:', result);
```

**Sending a Transaction**:
```javascript
const tx = await contract.someFunctionWithTransaction({ value: ethers.parseEther('1.0') });
await tx.wait();
console.log('Transaction Hash:', tx.hash);
```

**Listening for Events**:
```javascript
contract.on('SomeEvent', (eventData) => {
  console.log('Event Data:', eventData);
});
```

#### Querying Blockchain Data

**Getting Account Balance**:
```javascript
const balance = await provider.getBalance(wallet.address);
console.log('Balance:', ethers.formatEther(balance));
```

**Getting Transaction Details**:
```javascript
const tx = await provider.getTransaction('transaction-hash-here');
console.log('Transaction Details:', tx);
```

**Getting Block Information**:
```javascript
const block = await provider.getBlock('block-number-or-hash-here');
console.log('Block Information:', block);
```

### Conclusion

Ethers.js is a powerful and comprehensive library that simplifies the process of interacting with the Ethereum blockchain. Its modular design and extensive feature set make it an ideal choice for the RealmDomains project. By using Ethers.js, we can efficiently manage wallets, deploy and interact with smart contracts, and query blockchain data.
