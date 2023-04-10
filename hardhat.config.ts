import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "hardhat-deploy";
import '@openzeppelin/hardhat-upgrades';
import "@openzeppelin/upgrades-core";

import * as dotenv from "dotenv";
dotenv.config();

import "./tasks";



const config: HardhatUserConfig = {
  solidity: "0.8.18",
  // Default network when you don't specify "--network {network_name}"
  defaultNetwork: "hardhat",
  etherscan: {
    apiKey: {
      sepolia: '',
      bscTestnet:''
    }
  },
  networks: {
    hardhat: {},
    localhost: {
      url: "http://localhost:8545",
    },
    sepolia: {
      url: "https://sepolia.infura.io/v3/" + process.env.INFURA_KEY,
      accounts: process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    bscTestnet: {
      url: process.env.BNBTest_URL || "",
      accounts: process.env.BNBTest_PRIVATE_KEY !== undefined ? [process.env.BNBTest_PRIVATE_KEY] : [],
    },
  }
};

export default config;
