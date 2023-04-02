
import { ethers, upgrades } from "hardhat"
import { expect } from "chai"
import { Contract, BigNumber } from "ethers"

describe("SmurfV2 (proxy)", function () {
  let smurf: Contract
  let smurfV2: Contract

  beforeEach(async function () {
    const Smurf = await ethers.getContractFactory("Smurf"); 
    const SmurfV2 = await ethers.getContractFactory("SmurfV2"); 
    //initilize with 77
    smurf = await upgrades.deployProxy(Smurf, [77], { initializer: 'initialize' });
    //执行升级
    smurfV2 = await upgrades.upgradeProxy(smurf.address, SmurfV2);

    console.log(smurfV2.address," smurf/proxy after upgrade");

  })

  it("should retrieve value previously stored and increment correctly", async function () {
    //初始值是不是77
    expect(await smurfV2.retrieve()).to.equal(BigNumber.from('77'));

    //执行+1
    await smurfV2.increment();
    //result = 77 + 1 = 78
    expect(await smurfV2.retrieve()).to.equal(BigNumber.from('78'));

    //设置值为100
    await smurfV2.setValue(100);
    expect(await smurfV2.retrieve()).to.equal(BigNumber.from('100'));

    //执行-1
    await smurfV2.reduce();

    //值为99
    expect(await smurfV2.retrieve()).to.equal(BigNumber.from('99'));
  })

})