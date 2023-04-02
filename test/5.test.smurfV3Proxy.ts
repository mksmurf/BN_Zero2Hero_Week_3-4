import { expect } from "chai"
import { ethers, upgrades } from "hardhat"
import { Contract, BigNumber } from "ethers"

describe("smurf (proxy) V3 with name", function () {
  let smurf:Contract
  let smurfV2:Contract
  let smurfV3:Contract

  beforeEach(async function () {
    const Smurf = await ethers.getContractFactory("Smurf");
    const SmurfV2 = await ethers.getContractFactory("SmurfV2");
    const SmurfV3 =  await ethers.getContractFactory("SmurfV3");

    //initialize with 77
    smurf = await upgrades.deployProxy(Smurf, [77], {initializer: 'setValue'});
    smurfV2 = await upgrades.upgradeProxy(smurf.address, SmurfV2);
    smurfV3 = await upgrades.upgradeProxy(smurf.address, SmurfV3);
  })

  it("should retrieve value previously stored and increment correctly", async function () {
    //查看v2里的value是不是 v1里的初始值
    expect(await smurfV2.retrieve()).to.equal(BigNumber.from('77'));
    //在v3执行+1 
    await smurfV3.increment();
    //查看v2 里边是不是77
    expect(await smurfV2.retrieve()).to.equal(BigNumber.from('78'));

    //在v2里设置value为100
    await smurfV2.setValue(100);
    //查看v2 里的值是不是100
    expect(await smurfV2.retrieve()).to.equal(BigNumber.from('100'));
  })

  it("should set name correctly in V3", async function () {
    expect(await smurfV3.name()).to.equal("");

    const boxname="my Smurf V3";
    await smurfV3.setName(boxname);
    expect(await smurfV3.name()).to.equal(boxname);
  })

})