import { expect } from "chai";
import { ethers, deployments, getNamedAccounts } from "hardhat";
import { Wallet } from "../typechain-types";

describe("Wallet contract", function () {

  it("deploy", async function() {
    const [ deployer ] = await ethers.getSigners();

    const Wallet = await ethers.getContractFactory("Wallet");

    await Wallet.deploy();
    console.log("First test")
  })

  it("add limit", async function() {

  })
});
