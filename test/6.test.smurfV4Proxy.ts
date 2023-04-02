import { expect } from "chai"
import { ethers, upgrades } from "hardhat"
import { Contract, BigNumber } from "ethers"

describe("smurf (proxy) V3 with name", function () {
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
    //name() removed, getName() now
    // expect(boxV4).to.not.have.own.property("name")
    expect(smurfV4.name).to.be.undefined
    expect(await smurfV4.getName()).to.equal("Name: ")

    const boxname="Smurf V4 Now"
    await smurfV4.setName(boxname)
    expect(await smurfV4.getName()).to.equal(boxname)
  })

})