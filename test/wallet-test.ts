import { expect } from "chai";
import { ethers, deployments, getNamedAccounts } from "hardhat";
import { Wallet } from "../typechain-types";
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";

describe("Wallet", function () {
  async function deploy() {
    const [ deployer, user ] = await ethers.getSigners();

    const Factory = await ethers.getContractFactory("Wallet");
    const wallet = await Factory.deploy();
  
    await wallet.deployed()

    return { wallet, deployer, user }
  }

  it("add limit", async function() {
    const { wallet, deployer, user } = await loadFixture(deploy);

    const payTx = await wallet.connect(deployer).payMoney({value: ethers.utils.parseEther("1.0")});
    await payTx.wait();

    console.log(await wallet.getBalance());

    const limitTx = await wallet.connect(deployer).addLimit(user.address, 1000000);
    await limitTx.wait();

    console.log(await wallet.members[user.address]);
  
    const withdrawTx = await wallet.connect(user).withdrawMoney(500000);
    await expect(() => withdrawTx).to.changeEtherBalance(user, +500000);
    await withdrawTx.wait();

    console.log(await wallet.members[user.address]);
  
    const delTX = await wallet.connect(deployer).deleteFromMembers(user.address);
    await delTX.wait();
  })
})


// describe("Wallet contract", function () {
//     let wallet: Wallet;
//     let deployer: string;
//     let user: string;

//     it("deploy", async function () {
//         const [deployer, user] = await ethers.getSigners();

//         const Wallet = await ethers.getContractFactory("Wallet");

//         const wallet = await Wallet.deploy();
//         await wallet.deployed();
//         console.log("it was deployed");
//     });

//     it("add limit", async function () {
//         console.log("допустим добавили");
//         const tx = await wallet.addLimit(user, 1000000);
//         await tx.wait();
//     });
// });