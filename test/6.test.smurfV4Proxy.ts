import { expect } from "chai"
import { ethers, upgrades } from "hardhat"
import { Contract, BigNumber } from "ethers"

describe("smurf (proxy) V4 with name", function () {
  let smurf:Contract;
  let smurfV2:Contract;
  let smurfV3:Contract;
  let smurfV4:Contract;

  beforeEach(async function () {
    const Smurf = await ethers.getContractFactory("Smurf");
    const SmurfV2 = await ethers.getContractFactory("SmurfV2");
    const SmurfV3 =  await ethers.getContractFactory("SmurfV3");
    const SmurfV4 =  await ethers.getContractFactory("SmurfV4");

    //initialize with 77
    smurf = await upgrades.deployProxy(Smurf, [77], {initializer: 'setValue'});
    smurfV2 = await upgrades.upgradeProxy(smurf.address, SmurfV2);
    smurfV3 = await upgrades.upgradeProxy(smurf.address, SmurfV3);
    smurfV4 = await upgrades.upgradeProxy(smurf.address, SmurfV4);
  })

  it("should retrieve value previously stored and increment correctly", async function () {
    expect(await smurfV4.retrieve()).to.equal(BigNumber.from('77'))
    await smurfV4.increment()
    expect(await smurfV4.retrieve()).to.equal(BigNumber.from('78'))

    await smurfV2.setValue(100)
    expect(await smurfV2.retrieve()).to.equal(BigNumber.from('100'))
  })

  it("should setName and getName correctly in V4", async function () {
    // Make sure the `name` variable is no longer defined as a public variable
    expect(smurfV4.name).to.be.undefined

    // Check the initial name value
    expect(await smurfV4.getName()).to.equal("")

    // Set the new name value for 'Smurf V4 Now'
    const newName = "Smurf V4 Now"
    await smurfV4.setName(newName)

    // Check the updated name value
    expect(await smurfV4.getName()).to.equal(newName)
  })

})