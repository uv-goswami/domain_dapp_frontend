import React, { useState } from 'react';

function BuyDomain() {
  const [domainName, setDomainName] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(`Domain to buy: ${domainName}`);
    setMessage(`Domain ${domainName} purchase initiated successfully!`);
    setDomainName('');
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
      <button type="submit">Buy Domain</button>
      {message && <p>{message}</p>}
    </form>
  );
}

export default BuyDomain;
