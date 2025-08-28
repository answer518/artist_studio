require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.28",
  // 将编译输出目录设置为./src/artifacts
  // 这样编译后的合约文件会直接输出到src目录内
  // 解决了之前的导入路径问题
  paths: {
    artifacts: "./src/artifacts"
  }
};
