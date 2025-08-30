# Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a Hardhat Ignition module that deploys that contract.

Try running some of the following tasks:

```shell
npx hardhat compile
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat ignition deploy ./ignition/modules/Lock.js
```

## DAPP访问合约流程

1、npx hardhat node 启动测试链
2、MetaMask钱包中添加测试网络并链接。
3、导入私钥创建一个测试账号，每个测试账号默认分配1000ETH（后续测试需要消耗ETH）
4、npx hardhat compile 编译合约。
5、npm run deploy 部署合约。
6、npm run start 启动web项目。
