import { task } from "hardhat/config";
// import { ethers } from "hardhat";
import { readAddressList } from "../scripts/helper";

task("smurfV1", "exchagne with smurf v1").setAction(async (_, hre) => {
  
  //和v1 版本交互，调用的是proxy合约
  const addressList = readAddressList();
  const proxyAddress = addressList['proxy'];
  //链接合约
  const smurf = await hre.ethers.getContractAt("Smurf", proxyAddress);

  //查看当前的value 值
  console.log("当前值: ", await smurf.retrieve());

  //设置一个新的value值
  console.log("设置值为77: ", await smurf.setValue(77));

  console.log("当前值: ", await smurf.retrieve());
});

task("smurfV2", "exchagne with smurf v2").setAction(async (_, hre) => {
  
  //和v2 版本交互，调用的是proxy合约
  const addressList = readAddressList();
  const proxyAddress = addressList['proxy'];
  //链接合约
  const smurfV2 = await hre.ethers.getContractAt("SmurfV2", proxyAddress);

  //v2 中新增了2个函数  increment / reduce
  //查看当前的value 值
  console.log("当前值: ", await smurfV2.retrieve());

  //调用reduce 对value-1
  console.log("执行减1操作: ", await smurfV2.reduce());

  //调用reduce 对value-1
  console.log("执行减1操作: ", await smurfV2.reduce());
  //查看当前的value 值
  console.log("当前值: ", await smurfV2.retrieve());

  //调用increment 对value+1
  console.log("执行减1操作: ", await smurfV2.increment());

  //查看当前的value 值
  console.log("当前值: ", await smurfV2.retrieve());
});

task("smurfV3", "exchagne with smurf v3").setAction(async (_, hre) => {
  
  //和v3 版本交互，调用的是proxy合约
  const addressList = readAddressList();
  const proxyAddress = addressList['proxy'];
  //链接合约
  const smurfV3 = await hre.ethers.getContractAt("SmurfV3", proxyAddress);

  //v3 中新增了1个name变量  setName() 可以修改name的值
  //查看当前的value 值
  console.log("当前值: ", await smurfV3.retrieve());

  //查看当前name 值
  console.log("当前name值: ", await smurfV3.name());

  //设置name 的值
  let boxname="It's Smurf V3 Now";
  await smurfV3.setName(boxname);
  
  console.log("当前name值: ", await smurfV3.name());
});

task("smurfV4", "exchagne with smurf v4").setAction(async (_, hre) => {
  
  //和v4 版本交互，调用的是proxy合约
  const addressList = readAddressList();
  const proxyAddress = addressList['proxy'];
  //链接合约
  const smurfV4 = await hre.ethers.getContractAt("SmurfV4", proxyAddress);

  //v4 中把name变为私有了，所以新增了getName() 来读取name的值
  //查看当前的value值，确保之前合约内容有效
  console.log("当前值: ", await smurfV4.retrieve());

  //设置新name 值
  let boxname="It's Smurf V4 Now";
  await smurfV4.setName(boxname);
  
  //查看当前name 值 
  console.log("当前name值: ", await smurfV4.getName());
});