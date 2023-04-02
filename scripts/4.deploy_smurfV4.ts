import { ethers,upgrades } from "hardhat"
import { readAddressList, storeAddressList } from "./helper";


//获取代理地址
const addressList = readAddressList();
const proxyAddress = addressList['proxy'];

async function main() {
  console.log(proxyAddress," original Smurf (proxy) address");

  const SmurfV4 = await ethers.getContractFactory("SmurfV4");

  //调用proxyAdmin 来升级v4
  console.log("Preparing upgrade to SmurfV4...");
  const smurfV4Address = await upgrades.prepareUpgrade(proxyAddress, SmurfV4);

  const admin = await upgrades.erc1967.getAdminAddress(proxyAddress);
  console.log(admin," AdminAddress");
  console.log(smurfV4Address, " SmurfV4 implementation contract address");

  addressList['proxyV4'] = proxyAddress;
  addressList['adminV4'] = admin;
  addressList['implementationV4'] = smurfV4Address;
  storeAddressList(addressList);
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})