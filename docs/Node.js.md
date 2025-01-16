# Node.js

## What is Node.js?

**Node.js** is an open-source, cross-platform runtime environment that allows developers to execute JavaScript code outside a web browser. Created by Ryan Dahl in 2009, Node.js is built on the V8 JavaScript engine, the same engine that powers Google's Chrome browser. It's designed to build scalable network applications efficiently.

## Key Features of Node.js

1. **Asynchronous and Event-Driven**:
   - **Asynchronous I/O**: Node.js uses non-blocking, event-driven I/O operations, which means that tasks like reading from disk or making network requests can be performed concurrently. This leads to higher performance and scalability.
   - **Event Loop**: The event loop is the core of Node.js's asynchronous operations. It continuously checks for events and dispatches callbacks when operations are complete.

2. **Single-Threaded but Highly Scalable**:
   - **Single-Threaded**: Node.js operates on a single thread, but it can handle multiple connections simultaneously thanks to its non-blocking nature.
   - **Concurrency**: Despite being single-threaded, Node.js can handle a large number of concurrent connections with minimal overhead.

3. **Fast Execution**:
   - **V8 Engine**: Node.js uses the V8 JavaScript engine, which compiles JavaScript code into machine code for fast and efficient execution.
   - **Performance**: The combination of the V8 engine and the asynchronous I/O model makes Node.js highly performant.

4. **Rich Ecosystem**:
   - **NPM (Node Package Manager)**: Node.js has a massive ecosystem of libraries and modules available through NPM, making it easier to build and maintain applications.
   - **Community Support**: A large and active community continually contributes to the development and improvement of Node.js and its ecosystem.

## Understanding Asynchronous Programming

### What is Asynchronous Programming?

Asynchronous programming is a programming paradigm that allows multiple tasks to be executed without waiting for each task to complete before starting the next one. This is particularly useful for I/O-bound operations, such as reading from a disk, making network requests, or querying a database, where waiting for the operation to complete would otherwise block the execution of other tasks.

### Key Concepts

1. **Event Loop**: The event loop is the core of asynchronous programming in Node.js. It continuously checks for events (e.g., I/O operations) and dispatches callbacks when operations are complete. This allows Node.js to handle multiple operations concurrently without blocking the main thread.

2. **Callbacks**: Callbacks are functions that are passed as arguments to other functions and are executed after a certain event or operation is completed. They are a common way to handle asynchronous operations in Node.js.

3. **Promises**: Promises are objects representing the eventual completion or failure of an asynchronous operation. They provide a cleaner and more manageable way to handle asynchronous code compared to callbacks.

4. **Async/Await**: `Async` functions and `await` expressions are syntactic sugar built on top of promises, making asynchronous code look and behave more like synchronous code. They provide a more readable and intuitive way to handle asynchronous operations.

### Example: Asynchronous Operation in Node.js

Here's an example of an asynchronous operation using callbacks, promises, and async/await:

**Using Callbacks**:
```javascript
const fs = require('fs');

// Asynchronous read with callback
fs.readFile('example.txt', 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading file:', err);
    return;
  }
  console.log('File contents:', data);
});
```

**Using Promises**:
```javascript
const fs = require('fs').promises;

// Asynchronous read with promises
fs.readFile('example.txt', 'utf8')
  .then(data => {
    console.log('File contents:', data);
  })
  .catch(err => {
    console.error('Error reading file:', err);
  });
```

**Using Async/Await**:
```javascript
const fs = require('fs').promises;

// Asynchronous read with async/await
async function readFile() {
  try {
    const data = await fs.readFile('example.txt', 'utf8');
    console.log('File contents:', data);
  } catch (err) {
    console.error('Error reading file:', err);
  }
}

readFile();
```

## Why Use Node.js in RealmDomains?

Node.js is integral to the RealmDomains project for its ability to handle asynchronous operations, scalability, and a large ecosystem of libraries and tools. It allows us to build a robust backend server, efficiently manage blockchain interactions, and streamline development processes.

### Key Components of Node.js in Our Project

1. **Express**:
   - **Purpose**: Express is a minimal and flexible Node.js web application framework that provides a robust set of features to build web and mobile applications.
   - **Why**: We use Express to create our backend server and define API routes for handling domain-related operations.

2. **Ethers.js**:
   - **Purpose**: Ethers.js is a library that provides an easy way to interact with the Ethereum blockchain and its ecosystem.
   - **Why**: Ethers.js allows us to create wallets, connect to Ethereum nodes, and interact with smart contracts, making it an essential tool for our dApp.

3. **Dotenv**:
   - **Purpose**: Dotenv is a zero-dependency module that loads environment variables from a `.env` file into `process.env`.
   - **Why**: We use Dotenv to manage configuration settings and sensitive information like API keys and private keys securely.

## Setting Up Node.js

### Installation

1. **Install Node.js**:
   - Download and install Node.js from [nodejs.org](https://nodejs.org/).
   - Verify the installation by running:
     ```bash
     node -v
     npm -v
     ```

2. **Initialize a Node.js Project**:
   - Create a new directory for your project and navigate into it:
     ```bash
     mkdir RealmDomains
     cd RealmDomains
     ```
   - Initialize a new Node.js project:
     ```bash
     npm init -y
     ```

3. **Install Dependencies**:
   - Install essential dependencies for the project:
     ```bash
     npm install express ethers dotenv
     ```

## Backend Server with Node.js

### Project Structure

Create the following directory structure for the backend server:

```
RealmDomains/
├── backend/
│   └── server.cjs
├── .env
├── package.json
└── (Other project files)
```

### Backend Server Code

**backend/server.cjs**:
```javascript
const express = require('express');
const { ethers } = require('ethers');
const dotenv = require('dotenv');
const contractABI = require('../artifacts/contracts/DomainMarketplace.sol/DomainMarketplace.json').abi; // Ensure correct path to ABI file

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

### Environment Variables

Create a `.env` file in the root directory to store configuration settings and sensitive information:

```
INFURA_PROJECT_URL=<Your Infura Project URL>
CONTRACT_ADDRESS=<Your Deployed Contract Address>
PRIVATE_KEY=<Your Ethereum Private Key>
PORT=3000
```

### Running the Server

Start the backend server by running the following command:

```bash
node backend/server.cjs
```

## Conclusion

Node.js is a powerful and versatile platform that has transformed the way developers build server-side applications. Its non-blocking, event-driven architecture, coupled with the speed of the V8 engine and a vibrant ecosystem, makes it an ideal choice for modern web and network applications. In the RealmDomains project, Node.js enables us to build a robust backend server that efficiently handles blockchain interactions and domain management operations.

---

