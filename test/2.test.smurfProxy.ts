
import { ethers, upgrades } from "hardhat"
import { expect } from "chai"
import { Contract, BigNumber } from "ethers"

describe("Smurf (proxy)", function () {
  let smurf:Contract

  beforeEach(async function () {
    const Smurf = await ethers.getContractFactory("Smurf")
        //initilize with 77
        smurf = await upgrades.deployProxy(Smurf, [77], {initializer: 'initialize'})
    })

  it("should retrieve value previously stored", async function () {    
    console.log(smurf.address," smurf(proxy)") 

    expect(await smurf.retrieve()).to.equal(BigNumber.from('77'))

    await smurf.setValue(100)
    expect(await smurf.retrieve()).to.equal(BigNumber.from('100'))
  })

})