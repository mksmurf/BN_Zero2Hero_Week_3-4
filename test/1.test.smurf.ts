// test/1.test.smurf.ts
import { expect } from "chai";
import { ethers } from "hardhat"
import { Contract, BigNumber } from "ethers"

describe("smurf", function () {
  let smurf:Contract;

  beforeEach(async function () {
    const Smurf = await ethers.getContractFactory("Smurf");
    smurf = await Smurf.deploy();
    await smurf.deployed();
  })

  it("should retrieve value previously stored", async function () {
    await smurf.setValue(77);
    expect(await smurf.retrieve()).to.equal(BigNumber.from('77'));

    await smurf.setValue(100);
    expect(await smurf.retrieve()).to.equal(BigNumber.from('100'));
  })
})