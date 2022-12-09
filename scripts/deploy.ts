import { ethers } from "hardhat";
import "hardhat-deploy";
import "hardhat-deploy-ethers";

async function main() {
  const Wallet = await ethers.getContractFactory("Wallet");
  const wallet = await Wallet.deploy();
  const [deployer] = await ethers.getSigners();
  
  await wallet.deployed();

  console.log(`Wallet deployed to ${wallet.address} with the account: ${await deployer.getAddress()}`);
  console.log("Account balance:", (await deployer.getBalance()).toString());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
