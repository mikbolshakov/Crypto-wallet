import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "hardhat-deploy";
import "hardhat-deploy-ethers";
import * as dotenv from "dotenv";
dotenv.config();

const config: HardhatUserConfig = {
    solidity: {
        version: "0.8.17",
    },
    networks: {
        goerli: {
            url: process.env.GOERLI,
            accounts: [<string>process.env.GOERLI_PRIVKEY],
        },
    },
    namedAccounts: {
        deployer: 0,
        user: 1
    },
};

export default config;
