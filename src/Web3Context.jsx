import React, { createContext, useContext, useState, useEffect } from 'react';
import { ethers } from 'ethers'; // Correct import for ethers
import Web3 from 'web3';
import DomainMarketplaceABI from '../artifacts/contracts/DomainMarketplace.sol/DomainMarketplace.json'; // Ensure the ABI is available and properly formatted

const Web3Context = createContext();

export const useWeb3 = () => useContext(Web3Context);

const CONTRACT_ADDRESS = '0x5FbDB2315678afecb367f032d93F642f64180aa3';

const getContract = (signer) => {
  return new ethers.Contract(CONTRACT_ADDRESS, DomainMarketplaceABI.abi, signer);
};

const listDomain = async (signer, domainName, price) => {
  try {
    const contract = getContract(signer);
    const priceInWei = ethers.parseEther(price.toString()); // Use parseEther directly from ethers
    const transaction = await contract.listDomain(domainName, priceInWei);
    await transaction.wait();
  } catch (error) {
    console.error("Error listing domain:", error);
    throw error;
  }
};

const buyDomain = async (signer, domainName) => {
  try {
    const contract = getContract(signer);
    const transaction = await contract.buyDomain(domainName, { value: ethers.parseEther('1') }); // Use parseEther directly from ethers
    await transaction.wait();
  } catch (error) {
    console.error("Error buying domain:", error);
    throw error;
  }
};

export const Web3ContextProvider = ({ children }) => {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [account, setAccount] = useState('');

  const connectWallet = async () => {
    if (window.ethereum) {
      console.log("MetaMask is installed");
      try {
        await window.ethereum.request({ method: 'wallet_requestPermissions', params: [{ eth_accounts: {} }] });
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        if (!accounts.length) {
          throw new Error("No active wallet found");
        }
  
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const userAccount = accounts[0];
  
        setProvider(provider);
        setSigner(signer);
        setAccount(userAccount);
  
        console.log("Wallet connected:", userAccount);
        console.log("Provider set:", provider);
        console.log("Signer set:", signer);
      } catch (error) {
        console.error("Error connecting to MetaMask:", error);
        if (error.message.includes("No active wallet found")) {
          alert("Please ensure MetaMask is unlocked and logged in with an active account.");
        }
      }
    } else {
      console.log("MetaMask not detected");
    }
  };
  

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', connectWallet);
    }
    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener('accountsChanged', connectWallet);
      }
    };
  }, []);

  useEffect(() => {
    console.log("Provider:", provider);
    console.log("Signer:", signer);
    console.log("Account:", account);
  }, [provider, signer, account]);

  return (
    <Web3Context.Provider value={{ provider, signer, account, connectWallet, listDomain, buyDomain }}>
      {children}
    </Web3Context.Provider>
  );
};
