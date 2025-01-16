# Frontend

## Introduction

The frontend of the RealmDomains project is responsible for providing an intuitive and responsive user interface for interacting with the decentralized domain marketplace. It allows users to list, buy, and manage domain names seamlessly. The frontend is built with modern web technologies to ensure a high-quality user experience.

## Key Technologies Used

1. **React**:
   - **Purpose**: React is a JavaScript library for building user interfaces. It allows developers to create reusable UI components and manage the state of the application efficiently.
   - **Why**: We use React to build a dynamic and responsive user interface for the RealmDomains project.

2. **Web3.js / Ethers.js**:
   - **Purpose**: Web3.js and Ethers.js are libraries for interacting with the Ethereum blockchain from the frontend. They enable the frontend to communicate with the smart contracts deployed on the blockchain.
   - **Why**: We use Ethers.js to manage blockchain interactions, such as listing and buying domains, and to ensure secure and efficient communication with the Ethereum network.

3. **CSS / Styled-Components**:
   - **Purpose**: CSS and Styled-Components are used for styling the user interface. Styled-Components is a library for writing CSS in JavaScript, allowing for more modular and maintainable styles.
   - **Why**: We use CSS and Styled-Components to create a visually appealing and consistent user interface.

## Setting Up the Frontend

### Installation

To get started with the frontend, follow these steps:

1. **Create a React Application**:
   ```bash
   npx create-react-app frontend
   cd frontend
   ```

2. **Install Dependencies**:
   - **Ethers.js**:
     ```bash
     npm install ethers
     ```
   - **Styled-Components**:
     ```bash
     npm install styled-components
     ```

## Project Structure

Create the following directory structure for the frontend:

```
RealmDomains/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   └── DomainList.js
│   │   │   └── DomainForm.js
│   │   ├── styles/
│   │   │   └── GlobalStyle.js
│   │   ├── App.js
│   │   ├── index.js
│   └── package.json
├── .env
├── backend/
├── contracts/
├── scripts/
└── (Other project files)
```

### Frontend Components

#### DomainForm.js

**DomainForm.js**:
```javascript
import React, { useState } from 'react';
import { ethers } from 'ethers';
import contractABI from '../artifacts/contracts/DomainMarketplace.sol/DomainMarketplace.json';
import styled from 'styled-components';

const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();
const contract = new ethers.Contract(process.env.REACT_APP_CONTRACT_ADDRESS, contractABI.abi, signer);

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 300px;
  margin: 0 auto;
`;

const Input = styled.input`
  margin-bottom: 10px;
  padding: 8px;
  font-size: 16px;
`;

const Button = styled.button`
  padding: 10px;
  font-size: 16px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
`;

function DomainForm() {
  const [domainName, setDomainName] = useState('');
  const [price, setPrice] = useState('');

  const listDomain = async (event) => {
    event.preventDefault();
    const parsedPrice = ethers.utils.parseEther(price);
    const tx = await contract.listDomain(domainName, parsedPrice);
    await tx.wait();
    alert('Domain listed successfully!');
  };

  return (
    <Form onSubmit={listDomain}>
      <h2>List Domain</h2>
      <Input
        type="text"
        placeholder="Domain Name"
        value={domainName}
        onChange={(e) => setDomainName(e.target.value)}
      />
      <Input
        type="text"
        placeholder="Price (ETH)"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <Button type="submit">List Domain</Button>
    </Form>
  );
}

export default DomainForm;
```

#### DomainList.js

**DomainList.js**:
```javascript
import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import contractABI from '../artifacts/contracts/DomainMarketplace.sol/DomainMarketplace.json';
import styled from 'styled-components';

const provider = new ethers.providers.Web3Provider(window.ethereum);
const contract = new ethers.Contract(process.env.REACT_APP_CONTRACT_ADDRESS, contractABI.abi, provider);

const List = styled.ul`
  list-style: none;
  padding: 0;
  width: 300px;
  margin: 0 auto;
`;

const ListItem = styled.li`
  padding: 10px;
  border-bottom: 1px solid #ccc;
`;

function DomainList() {
  const [domains, setDomains] = useState([]);

  useEffect(() => {
    const fetchDomains = async () => {
      const domainCount = await contract.getDomainCount();
      const domainList = [];
      for (let i = 0; i < domainCount; i++) {
        const domain = await contract.getDomain(i);
        domainList.push(domain);
      }
      setDomains(domainList);
    };

    fetchDomains();
  }, []);

  return (
    <List>
      <h2>Domain List</h2>
      {domains.map((domain, index) => (
        <ListItem key={index}>
          <p>{domain.name}</p>
          <p>{ethers.utils.formatEther(domain.price)} ETH</p>
          <p>Owner: {domain.owner}</p>
        </ListItem>
      ))}
    </List>
  );
}

export default DomainList;
```

### Styling

#### GlobalStyle.js

**GlobalStyle.js**:
```javascript
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
    background-color: #f8f9fa;
  }

  h2 {
    text-align: center;
  }
`;

export default GlobalStyle;
```

### Main Application

#### App.js

**App.js**:
```javascript
import React from 'react';
import DomainForm from './components/DomainForm';
import DomainList from './components/DomainList';
import GlobalStyle from './styles/GlobalStyle';

function App() {
  return (
    <div>
      <GlobalStyle />
      <h1>RealmDomains</h1>
      <DomainForm />
      <DomainList />
    </div>
  );
}

export default App;
```

#### index.js

**index.js**:
```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(<App />, document.getElementById('root'));
```

### Running the Frontend

Start the frontend application by running the following command:

```bash
npm start
```

## Conclusion

The frontend of the RealmDomains project is built using modern web technologies, including React and Ethers.js, to provide a seamless and responsive user interface for interacting with the decentralized domain marketplace. By following this guide, you can set up and run the frontend application, enabling users to list, buy, and manage domain names effortlessly.
