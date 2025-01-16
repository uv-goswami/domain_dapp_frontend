# Web3Context

## Introduction

The `Web3Context` is a custom React context that provides Web3-related functionality to the components within the RealmDomains project. It simplifies the integration of Web3.js or Ethers.js and allows components to access Web3 functionality, such as connecting to a wallet, interacting with smart contracts, and managing blockchain state. This document provides a detailed explanation of the purpose, logic, and implementation of the `Web3Context`.

## Purpose

The primary purpose of the `Web3Context` is to create a centralized way of managing and providing Web3-related state and functions throughout the application. This helps in maintaining a cleaner codebase and makes it easier to manage blockchain interactions from any component.

## Implementation

### Project Structure

The `Web3Context` is part of the frontend application and is located in the `src` directory.

```
RealmDomains/
├── frontend/
│   ├── src/
│   │   ├── context/
│   │   │   └── Web3Context.js
│   │   ├── components/
│   │   ├── App.js
│   │   ├── index.js
│   └── package.json
├── .env
├── backend/
├── contracts/
├── scripts/
└── (Other project files)
```

### Context Code

**Web3Context.js**:

```javascript
import React, { createContext, useContext, useEffect, useState } from 'react';
import { ethers } from 'ethers';
import contractABI from '../artifacts/contracts/DomainMarketplace.sol/DomainMarketplace.json';

const Web3Context = createContext();

export const Web3Provider = ({ children }) => {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);

  useEffect(() => {
    const initWeb3 = async () => {
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
          process.env.REACT_APP_CONTRACT_ADDRESS,
          contractABI.abi,
          signer
        );
        setProvider(provider);
        setSigner(signer);
        setContract(contract);
      }
    };

    initWeb3();
  }, []);

  const listDomain = async (signer, domainName, price) => {
    const parsedPrice = ethers.utils.parseEther(price);
    const tx = await contract.listDomain(domainName, parsedPrice);
    await tx.wait();
  };

  return (
    <Web3Context.Provider value={{ provider, signer, contract, listDomain }}>
      {children}
    </Web3Context.Provider>
  );
};

export const useWeb3 = () => useContext(Web3Context);
```
- **Import Statements**:
  - React and related hooks (`createContext`, `useContext`, `useEffect`, `useState`) are imported.
  - Ethers.js is imported to handle interactions with the Ethereum blockchain.
  - The ABI of the `DomainMarketplace` smart contract is imported for contract interactions.

- **Creating Context**:
  - `Web3Context`: A context for managing and providing Web3-related state and functions.
  - `createContext()`: Creates a new context for Web3.

- **Provider Component**:
  - `Web3Provider`: A provider component that will wrap the application and provide Web3-related state and functions to its children.
  - **State Hooks**:
    - `useState(null)`: Initializes state variables `provider`, `signer`, and `contract` with `null` as their initial value.
  
- **Effect Hook**:
  - `useEffect(() => { ... }, [])`: Runs the provided function once after the component mounts. The empty dependency array `[]` ensures it runs only once.
  - **Initialize Web3**:
    - `initWeb3`: An asynchronous function that initializes the Web3 provider, signer, and contract if `window.ethereum` is available.
    - `new ethers.providers.Web3Provider(window.ethereum)`: Creates a new provider using MetaMask's injected `ethereum` object.
    - `provider.getSigner()`: Retrieves the signer (connected Ethereum account).
    - `new ethers.Contract(process.env.REACT_APP_CONTRACT_ADDRESS, contractABI.abi, signer)`: Creates a new contract instance using the contract address from environment variables, the contract ABI, and the signer.
    - `setProvider(provider), setSigner(signer), setContract(contract)`: Updates the state with the initialized values.

- **Function for Listing Domain**:
  - `listDomain`: An asynchronous function that lists a domain on the blockchain.
  - `ethers.utils.parseEther(price)`: Converts the price from Ether (ETH) to Wei (the smallest unit of Ether).
  - `await contract.listDomain(domainName, parsedPrice)`: Calls the smart contract method `listDomain` with the domain name and price in Wei.
  - `await tx.wait()`: Waits for the transaction to be confirmed.

- **Providing Context Values**:
  - `<Web3Context.Provider value={{ provider, signer, contract, listDomain }}>`: Provides the Web3-related state and functions to the component's children.
  - `{children}`: Represents the nested components that will consume the context.

- **Custom Hook**:
  - `useWeb3()`: A custom hook that allows components to consume the `Web3Context`.

## Usage

The `Web3Provider` should wrap the main application to provide Web3-related state and functions to the entire component tree. Components can use the `useWeb3` hook to access the Web3 functionality.

### Example

**App.js**:
```javascript
import React from 'react';
import { Web3Provider } from './context/Web3Context';
import ListDomain from './components/ListDomain';

function App() {
  return (
    <Web3Provider>
      <ListDomain />
    </Web3Provider>
  );
}

export default App;
```
- **Web3Provider**:
  - Wraps the `ListDomain` component with `Web3Provider` to provide Web3-related context.

**ListDomain.jsx**:
```javascript
import React, { useState } from 'react';
import { useWeb3 } from './Web3Context';

function ListDomain() {
  const [domainName, setDomainName] = useState('');
  const [price, setPrice] = useState('');
  const [message, setMessage] = useState('');
  const { signer, listDomain } = useWeb3();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!signer) {
      setMessage('Please connect your wallet first.');
      return;
    }
    try {
      await listDomain(signer, domainName, price);
      setMessage(`Domain ${domainName} listed successfully!`);
      setDomainName('');
      setPrice('');
    } catch (error) {
      setMessage(`Failed to list domain: ${error.message}`);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Domain Name:</label>
        <input
          type="text"
          value={domainName}
          onChange={(e) => setDomainName(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Price (in ETH):</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
      </div>
      <button type="submit">List Domain</button>
      {message && <p>{message}</p>}
    </form>
  );
}

export default ListDomain;
```
- **useWeb3**:
  - `const { signer, listDomain } = useWeb3()`: Uses the custom `useWeb3` hook to access the signer and `listDomain` function from the `Web3Context`.

## Conclusion

The `Web3Context` simplifies the integration and management of Web3-related functionality in the RealmDomains project. By creating a centralized context for Web3 state and functions, it allows components to easily access and interact with the Ethereum blockchain. This document covers the implementation details and usage of the `Web3Context`, providing a clean and efficient way to manage blockchain interactions in the application.
