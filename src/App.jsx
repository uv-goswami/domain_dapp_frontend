import React, { useState } from 'react';
import { Web3ContextProvider } from './Web3Context';
import ConnectWallet from './components/ConnectWallet';
import ListDomain from './components/ListDomain';
import ViewListings from './components/ViewListings';
import BuyDomain from './components/BuyDomain';
import './index.css'; // Assuming styles are in index.css

function App() {
  const [page, setPage] = useState('list');

  return (
    <Web3ContextProvider>
      <div>
        <header>
          <h1>Domain Marketplace dApp</h1>
          <nav>
            <button onClick={() => setPage('list')}>List Domain</button>
            <button onClick={() => setPage('view')}>View Listings</button>
            <button onClick={() => setPage('buy')}>Buy Domain</button>
          </nav>
          <ConnectWallet />
        </header>
        <main>
          {page === 'list' && <ListDomain />}
          {page === 'view' && <ViewListings />}
          {page === 'buy' && <BuyDomain />}
        </main>
      </div>
    </Web3ContextProvider>
  );
}

export default App;