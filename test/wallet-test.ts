import { expect } from "chai";
import { ethers } from "hardhat";
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

    expect(await wallet.getBalance()).to.equal(ethers.utils.parseEther("1.0"));

    const limitTx = await wallet.connect(deployer).addLimit(user.address, 1000000);
    await limitTx.wait();

    expect(await wallet.members(user.address)).to.equal(1000000);
  
    const withdrawTx = await wallet.connect(user).withdrawMoney(700000);
    await expect(withdrawTx).to.changeEtherBalance(user, +700000);
    await withdrawTx.wait();

    expect(await wallet.members(user.address)).to.equal(300000);
  
    const delTX = await wallet.connect(deployer).deleteFromMembers(user.address);
    await delTX.wait();

    expect(await wallet.members(user.address)).to.equal(0);
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