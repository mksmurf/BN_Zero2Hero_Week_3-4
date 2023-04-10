import { ethers, upgrades } from "hardhat"
import { readAddressList, storeAddressList } from "./helper";

const addressList = readAddressList();
const proxyAddress = addressList['proxy'];

async function main() {
  console.log(proxyAddress, " original smurf(proxy) address");
  const SmurfV2 = await ethers.getContractFactory("SmurfV2");
  console.log("upgrade to SmurfV2...");
  const upgradedSmurf = await upgrades.upgradeProxy(proxyAddress, SmurfV2);

  // Wait for the upgrade to complete and get the new address
  const upgradedSmurfAddress = await upgradedSmurf.address;

  const implementation = await upgrades.erc1967.getImplementationAddress(upgradedSmurfAddress);

  const admin = await upgrades.erc1967.getAdminAddress(upgradedSmurfAddress);

  console.log(upgradedSmurfAddress, " smurfV2 address(should be the same)")
  console.log(admin, " AdminAddress");
  console.log(implementation, " ImplementationAddress")

  addressList['proxyV2'] = upgradedSmurfAddress;
  addressList['adminV2'] = admin;
  addressList['implementationV2'] = implementation;
  storeAddressList(addressList);
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
