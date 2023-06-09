import { ethers, upgrades } from "hardhat"
import { readAddressList, storeAddressList } from "./helper";

const addressList = readAddressList();
const proxyAddress = addressList['proxy'];

async function main() {
  console.log(proxyAddress, " original smurf(proxy) address");
  const SmurfV3 = await ethers.getContractFactory("SmurfV3");
  console.log("upgrade to SmurfV3...");
  const smurfV3 = await upgrades.upgradeProxy(proxyAddress, SmurfV3);

  // Wait for the upgrade to complete and get the new address
  const smurfV3Address = await smurfV3.address;

  const implementation = await upgrades.erc1967.getImplementationAddress(smurfV3Address);

  const admin = await upgrades.erc1967.getAdminAddress(smurfV3Address);

  console.log(smurfV3Address, " smurfV3 address(should be the same)")
  console.log(admin, " AdminAddress");
  console.log(implementation, " ImplementationAddress")

  addressList['proxyV3'] = smurfV3Address;
  addressList['adminV3'] = admin;
  addressList['implementationV3'] = implementation;
  storeAddressList(addressList);
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
