const hre = require("hardhat");

async function main() {
  const DomainMarketplace = await hre.ethers.getContractFactory("DomainMarketplace");
  const domainMarketplace = await DomainMarketplace.deploy();

  console.log("Deploying the contract...");
  await domainMarketplace.deployTransaction.wait(); // This waits for the transaction to be mined
  console.log("DomainMarketplace deployed!");

  const contractAddress = domainMarketplace.address;
  console.log(`DomainMarketplace deployed to: ${contractAddress}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
