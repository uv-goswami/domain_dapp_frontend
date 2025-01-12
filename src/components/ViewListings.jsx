import React, { useState, useEffect } from 'react';

function ViewListings() {
  const [listings, setListings] = useState([
    { id: 1, domainName: 'example.com', price: '0.5' },
    { id: 2, domainName: 'mywebsite.net', price: '0.3' },
    { id: 3, domainName: 'cooldomain.org', price: '1.2' },
  ]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Simulate fetching data
    setTimeout(() => {
      setListings([
        { id: 1, domainName: 'example.com', price: '0.5' },
        { id: 2, domainName: 'mywebsite.net', price: '0.3' },
        { id: 3, domainName: 'cooldomain.org', price: '1.2' },
      ]);
    }, 1000);
  }, []);

  return (
    <div>
      <h2>Available Domains</h2>
      {message && <p>{message}</p>}
      <ul>
        {listings.map((listing) => (
          <li key={listing.id}>
            {listing.domainName} - {listing.price} ETH
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ViewListings;
