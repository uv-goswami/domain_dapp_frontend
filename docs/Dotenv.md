# Dotenv

## What is Dotenv?

**Dotenv** is a zero-dependency module that loads environment variables from a `.env` file into `process.env`. Environment variables are often used to store configuration settings and sensitive information, such as API keys, database credentials, and private keys, in a secure and manageable way.

## Why Use Dotenv?

Dotenv is widely used for the following reasons:

- **Simplicity**: Provides a simple way to manage environment variables without hardcoding them in your application code.
- **Security**: Helps keep sensitive information out of your source code, reducing the risk of accidental exposure.
- **Configurability**: Allows easy configuration of different environments (e.g., development, testing, production) by using different `.env` files.
- **Ease of Use**: Integrates seamlessly with Node.js applications and other development tools.

## Setting Up Dotenv

### Installation

To get started with Dotenv, follow these steps:

1. **Install Dotenv**:
   ```bash
   npm install dotenv
   ```

2. **Create a `.env` File**:
   In the root directory of your project, create a file named `.env` and add your environment variables.

3. **Load Environment Variables**:
   At the top of your application code, require and configure Dotenv to load the environment variables from the `.env` file.

**Example**:
```javascript
const dotenv = require('dotenv');
dotenv.config();
```

### Example `.env` File

A typical `.env` file might look like this:
```
INFURA_PROJECT_URL=https://rinkeby.infura.io/v3/your-project-id
CONTRACT_ADDRESS=0xYourContractAddress
PRIVATE_KEY=your-private-key
PORT=3000
```

## Using Dotenv in RealmDomains

### Project Structure

Create the following directory structure for the backend server with Dotenv:

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

### Environment Variables

Create a `.env` file in the root directory to store configuration settings and sensitive information:

```
INFURA_PROJECT_URL=https://rinkeby.infura.io/v3/your-project-id
CONTRACT_ADDRESS=0xYourContractAddress
PRIVATE_KEY=your-private-key
PORT=3000
```

### Best Practices for Using Dotenv

1. **Never Commit `.env` Files**: Ensure that your `.env` files are not committed to version control by adding them to your `.gitignore` file.
   ```
   .env
   ```

2. **Use Different `.env` Files for Different Environments**: Create separate `.env` files for development, testing, and production environments. You can load different files based on the environment.
   - `.env.development`
   - `.env.testing`
   - `.env.production`

3. **Validate Environment Variables**: Validate the presence and correctness of required environment variables at the start of your application to avoid runtime errors.

**Example**:
```javascript
if (!process.env.INFURA_PROJECT_URL || !process.env.CONTRACT_ADDRESS || !process.env.PRIVATE_KEY) {
  throw new Error('Missing required environment variables. Please check your .env file.');
}
```

### Conclusion

Dotenv is a simple yet powerful tool for managing environment variables in Node.js applications. By using Dotenv in the RealmDomains project, we can securely and efficiently manage configuration settings and sensitive information, ensuring that our application is properly configured for different environments.
