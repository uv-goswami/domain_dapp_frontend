# Express.js

## What is Express.js?

**Express.js** is a minimal and flexible Node.js web application framework that provides a robust set of features to build web and mobile applications. It simplifies the development of web servers and APIs, making it easier to manage routing, middleware, and request handling.

## Why Use Express.js?

Express.js is widely used for the following reasons:

- **Simplicity**: Provides a simple and straightforward API for building web applications.
- **Flexibility**: Highly flexible and can be customized with various middleware and plugins.
- **Performance**: Built on top of Node.js, it leverages the non-blocking I/O and event-driven architecture for high performance.
- **Middleware**: A rich set of middleware available for handling different aspects of web development, such as authentication, logging, and error handling.
- **Routing**: Built-in support for routing makes it easy to define and manage different endpoints and HTTP methods.

## Setting Up Express.js

### Installation

To get started with Express.js, follow these steps:

1. **Install Express.js**:
   ```bash
   npm install express
   ```

2. **Set Up a Basic Express Server**:
   Create a file named `server.js` and add the following code to set up a basic Express server:

   ```javascript
   const express = require('express');
   const app = express();
   const port = process.env.PORT || 3000;

   app.get('/', (req, res) => {
     res.send('Hello, World!');
   });

   app.listen(port, () => {
     console.log(`Server running at http://localhost:${port}`);
   });
   ```

3. **Run the Server**:
   Start the server by running the following command:
   ```bash
   node server.js
   ```

### Routing in Express.js

Express.js provides a simple and intuitive way to define routes for different HTTP methods (GET, POST, PUT, DELETE, etc.). Routes are defined using the `app.METHOD` functions, where `METHOD` is the HTTP method.

**Example Routes**:
```javascript
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('GET request to the homepage');
});

app.post('/submit', (req, res) => {
  res.send('POST request to /submit');
});

app.put('/update', (req, res) => {
  res.send('PUT request to /update');
});

app.delete('/delete', (req, res) => {
  res.send('DELETE request to /delete');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
```

### Middleware in Express.js

Middleware functions are functions that have access to the request object (`req`), the response object (`res`), and the next middleware function in the application's request-response cycle. They can execute code, make changes to the request and response objects, end the request-response cycle, and call the next middleware function.

**Using Middleware**:
```javascript
const express = require('express');
const app = express();

// Middleware function
app.use((req, res, next) => {
  console.log('Middleware function executed');
  next();
});

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
```

### Error Handling in Express.js

Error handling middleware is used to handle errors that occur during the request-response cycle. An error-handling middleware function must have four arguments: `err`, `req`, `res`, and `next`.

**Error Handling Middleware**:
```javascript
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  throw new Error('Something went wrong!');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Internal Server Error');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
```

## Using Express.js in RealmDomains

### Project Structure

Create the following directory structure for the backend server with Express.js:

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

### Running the Server

Start the backend server by running the following command:

```bash
node backend/server.js
```

## Conclusion

Express.js is a powerful and flexible framework for building web applications and APIs with Node.js. Its simplicity, performance, and rich ecosystem make it an ideal choice for the backend development of the RealmDomains project. By using Express.js, we can efficiently handle routing, middleware, and error handling, enabling us to build a robust and scalable backend server.

