
import { ethers,upgrades } from "hardhat"
import { readAddressList, storeAddressList } from "./helper";

const addressList = readAddressList();
const proxyAddress = addressList['proxy'];

async function main() {
  console.log(proxyAddress," original smurf(proxy) address");
  const SmurfV2 = await ethers.getContractFactory("SmurfV2");
  console.log("upgrade to SmurfV2...");
  const smurfV2 = await upgrades.upgradeProxy(proxyAddress, SmurfV2);

  const implementation = await upgrades.erc1967.getImplementationAddress(smurfV2.address);

  const admin = await upgrades.erc1967.getAdminAddress(smurfV2.address);

  console.log(smurfV2.address," smurfV2 address(should be the same)")
  console.log(admin," AdminAddress");
  console.log(implementation," ImplementationAddress")

  addressList['proxyV2'] = smurfV2.address;
  addressList['adminV2'] = admin;
  addressList['implementationV2'] = implementation;
  storeAddressList(addressList);
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})


