# 使用Hardhat在BNB Testnet部署一套可升级的代理合约，至少包含常量，状态变量和读写状态变量的函数

**逻辑合约 Smurf.sol**
(将localhost替换为bscTestnet可部署到BSC Test Network)

v1版本部署
```shell
npx hardhat run scripts/1.deploy_smurf.ts --network localhost
```
与v1版本交互
```shell
npx hardhat smurfV1 --network localhost
```
升级v2
```shell
npx hardhat run scripts/2.deploy_smurfV2.ts --network localhost
```
与v2版本交互
```shell
npx hardhat smurfV2 --network localhost
```

升级v3
```shell
npx hardhat run scripts/3.deploy_smurfV3.ts --network localhost
```
与v3版本交互
```shell
npx hardhat smurfV3 --network localhost
```

升级v4
```shell
npx hardhat run scripts/4.deploy_smurfV4.ts --network localhost
```
与v4版本交互*
```shell
npx hardhat smurfV4 --network localhost
```

##验证合约（需要设置bscTestnet的API KEY）
```shell
npx hardhat verify <contract address> --network bscTestnet
```

