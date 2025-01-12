import React, { useState } from 'react';
import { useWeb3 } from '../Web3Context';

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
