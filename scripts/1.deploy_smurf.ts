
import { ethers,upgrades } from "hardhat"
import { readAddressList, storeAddressList } from "./helper";

async function main() {

  const Smurf = await ethers.getContractFactory("Smurf")
  console.log("Deploying smurf...")
  
  //部署合约  执行3笔交易  部署 代理合约 逻辑合约  proxyadmin合约
  const smurf = await upgrades.deployProxy(Smurf,[42], { initializer: 'initialize' })

  await smurf.deployed();
  console.log(smurf.address," smurf(proxy) address")

  const admin = await upgrades.erc1967.getAdminAddress(smurf.address);

  console.log(admin," AdminAddress");

  const implementation = await upgrades.erc1967.getImplementationAddress(smurf.address);

  console.log(implementation," ImplementationAddress")

  const addressList = readAddressList();

  addressList['proxy'] = smurf.address;
  addressList['admin'] = admin;
  addressList['implementation'] = implementation;
  storeAddressList(addressList);

}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})