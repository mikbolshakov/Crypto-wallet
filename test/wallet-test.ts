import { expect } from "chai";
import { ethers, deployments, getNamedAccounts } from "hardhat";
import { Wallet } from "../typechain-types";

describe("Wallet", function () {
  let deployer: string;
  let user: string;
  let wallet: Wallet;
  let walletAsUser: Wallet;

  beforeEach(async function () {
    await deployments.fixture(["Wallet"]);

    // ({ deployer, user } = await getNamedAccounts());
    wallet = await ethers.getContract<Wallet>("Wallet");
    // walletAsUser = await ethers.getContract<Wallet>("Wallet", user);
  });

  it("works", async function() {
    console.log(wallet)
    // const addLimitTx = await wallet.addLimit(user, 100000);
    // await addLimitTx.wait();
    // expect(addLimitTx).to.eq(100000);
  })
});
