const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  const balance = await deployer.provider.getBalance(deployer.address);
  console.log("Account balance:", ethers.formatEther(balance));

  const DomainMarketplace = await ethers.getContractFactory("DomainMarketplace");
  const domainMarketplace = await DomainMarketplace.deploy();

  console.log("Contract is being deployed...");

  // Wait for the contract to be deployed
  await domainMarketplace.waitForDeployment();

  console.log("DomainMarketplace contract address:", domainMarketplace.target);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
