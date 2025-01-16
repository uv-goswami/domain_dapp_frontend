# ViewListing.jsx

## Introduction

The `ViewListing.jsx` component is responsible for displaying the details of a listed domain in the RealmDomains frontend application. It allows users to view information about a specific domain, such as the domain name, price, and owner. This document provides a detailed explanation of the purpose, logic, and implementation of the `ViewListing.jsx` component.

## Purpose

The primary purpose of the `ViewListing.jsx` component is to provide users with a detailed view of a specific domain listing. It fetches the relevant information from the Ethereum blockchain and displays it in a user-friendly format. This allows users to make informed decisions when interacting with the domain marketplace.

## Implementation

### Project Structure

The `ViewListing.jsx` component is located in the `src/components` directory of the frontend application.

```
RealmDomains/
├── frontend/
│   ├── src/
│   │   ├── context/
│   │   ├── components/
│   │   │   └── ViewListing.jsx
│   │   ├── styles/
│   │   ├── App.jsx
│   │   ├── index.js
│   └── package.json
├── .env
├── backend/
├── contracts/
├── scripts/
└── (Other project files)
```

### Component Code

**ViewListing.jsx**:

```javascript
import React, { useState, useEffect } from 'react';
import { useWeb3 } from './Web3Context';
import { useParams } from 'react-router-dom';

function ViewListing() {
  const { domainName } = useParams();
  const { contract } = useWeb3();
  const [listing, setListing] = useState(null);

  useEffect(() => {
    const fetchListing = async () => {
      if (contract) {
        try {
          const listing = await contract.getDomain(domainName);
          setListing(listing);
        } catch (error) {
          console.error('Failed to fetch listing:', error);
        }
      }
    };

    fetchListing();
  }, [contract, domainName]);

  if (!listing) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>Domain Listing: {listing.name}</h2>
      <p>Price: {listing.price && ethers.utils.formatEther(listing.price)} ETH</p>
      <p>Owner: {listing.owner}</p>
    </div>
  );
}

export default ViewListing;
```
- **Import Statements**:
  - `React`: The core React library is imported to use React functionality.
  - `useState` and `useEffect`: React hooks for managing state and side effects within function components.
  - `useWeb3`: A custom hook (likely defined in `Web3Context.js`) that provides Web3-related functionality, such as the contract instance.
  - `useParams`: A hook from `react-router-dom` used to access route parameters.

- **Function Component**:
  - `ViewListing`: Defines a functional component named `ViewListing`.

```javascript
  const { domainName } = useParams();
  const { contract } = useWeb3();
  const [listing, setListing] = useState(null);
```
- **Route Parameters**:
  - `useParams()`: Extracts the `domainName` parameter from the URL.
- **Custom Hook**:
  - `useWeb3()`: Invokes the custom hook to extract Web3-related functionality, specifically the `contract` instance.
- **State Hook**:
  - `useState(null)`: Initializes a state variable `listing` with `null` as its initial value and a corresponding setter function `setListing`.

```javascript
  useEffect(() => {
    const fetchListing = async () => {
      if (contract) {
        try {
          const listing = await contract.getDomain(domainName);
          setListing(listing);
        } catch (error) {
          console.error('Failed to fetch listing:', error);
        }
      }
    };

    fetchListing();
  }, [contract, domainName]);
```
- **Effect Hook**:
  - `useEffect(() => { ... }, [contract, domainName])`: Runs the provided function whenever the `contract` or `domainName` changes.
- **Fetch Listing**:
  - `fetchListing`: An asynchronous function that fetches the listing details from the blockchain.
  - `if (contract) { ... }`: Ensures the contract instance is available.
  - `try { ... } catch (error) { ... }`: Attempts to fetch the listing details using the `getDomain` method of the contract and handles any errors that occur.
  - `const listing = await contract.getDomain(domainName)`: Calls the smart contract method `getDomain` with the domain name to fetch the listing details.
  - `setListing(listing)`: Updates the `listing` state with the fetched data.

```javascript
  if (!listing) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>Domain Listing: {listing.name}</h2>
      <p>Price: {listing.price && ethers.utils.formatEther(listing.price)} ETH</p>
      <p>Owner: {listing.owner}</p>
    </div>
  );
}
```
- **Loading State**:
  - `if (!listing) { return <p>Loading...</p>; }`: If the listing data is not yet available, renders a loading message.
- **Return JSX**:
  - `<div>`: Contains the main content of the component.
  - `<h2>Domain Listing: {listing.name}</h2>`: Displays the domain name.
  - `<p>Price: {listing.price && ethers.utils.formatEther(listing.price)} ETH</p>`: Displays the domain price in Ether.
  - `<p>Owner: {listing.owner}</p>`: Displays the domain owner.

```javascript
export default ViewListing;
```
- **Export Statement**:
  - `export default ViewListing`: Exports the `ViewListing` component as the default export, making it available for import in other parts of the application.

## Conclusion

The `ViewListing.jsx` component is responsible for displaying the details of a listed domain in the RealmDomains frontend application. It fetches the relevant information from the Ethereum blockchain and displays it in a user-friendly format. By understanding the implementation of the `ViewListing.jsx` component, we can see how the application retrieves and displays domain listing details, providing users with the information they need to make informed decisions.
