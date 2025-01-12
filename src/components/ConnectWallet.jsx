import React from 'react';
import { useWeb3 } from '../Web3Context';

const ConnectWallet = () => {
  const { connectWallet, account } = useWeb3();

  return (
    <div>
      <button onClick={connectWallet}>Connect Wallet</button>
      {account && <p>Connected Account: {account}</p>}
    </div>
  );
};

export default ConnectWallet;
