const { ethers, upgrades } = require("hardhat");
const { readAddressList, storeAddressList } = require("./helper");

const addressList = readAddressList();
const proxyAddress = addressList["proxy"];

async function main() {
  console.log(proxyAddress, " original smurf(proxy) address");
  const SmurfV4 = await ethers.getContractFactory("SmurfV4");
  console.log("upgrade to SmurfV4...");

  // Wait for 5 seconds before performing the upgrade
  await new Promise((resolve) => setTimeout(resolve, 10000));

  const smurfV4 = await upgrades.upgradeProxy(proxyAddress, SmurfV4);

  const implementation = await upgrades.erc1967.getImplementationAddress(smurfV4.address);
  const admin = await upgrades.erc1967.getAdminAddress(smurfV4.address);

  console.log(smurfV4.address, " smurfV4 address(should be the same)");
  console.log(admin, " AdminAddress");
  console.log(implementation, " ImplementationAddress");

  addressList["proxyV4"] = smurfV4.address;
  addressList["adminV4"] = admin;
  addressList["implementationV4"] = implementation;
  storeAddressList(addressList);
}

main()
  .then(() => {
    console.log("Upgrade complete!");
    process.exit(0);
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
