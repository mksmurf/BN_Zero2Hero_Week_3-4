
import { expect } from "chai";
import { ethers } from "hardhat"
import { Contract, BigNumber } from "ethers"

describe("smurfV2", function () {
  let smurfV2:Contract

  beforeEach(async function () {
    const SmurfV2 = await ethers.getContractFactory("SmurfV2")
    smurfV2 = await SmurfV2.deploy()
    await smurfV2.deployed()
  });

  it("should retrievevalue previously stored", async function () {
    await smurfV2.setValue(77)
    expect(await smurfV2.retrieve()).to.equal(BigNumber.from('77'))

    await smurfV2.setValue(100)
    expect(await smurfV2.retrieve()).to.equal(BigNumber.from('100'))
  });

  it('should increment value correctly', async function () {
    await smurfV2.setValue(77)
    await smurfV2.increment()
    expect(await smurfV2.retrieve()).to.equal(BigNumber.from('78'))

    await smurfV2.reduce()
    expect(await smurfV2.retrieve()).to.equal(BigNumber.from('77'))
  })
})