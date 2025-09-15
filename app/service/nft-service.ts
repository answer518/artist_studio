'use client';

import { ethers } from "ethers";
import axios from "axios";

import { trying } from "./connection-service";
import { Nft } from "./types";
import { configuration } from "../config";

// 需要导入NFT合约ABI
// 在Next.js项目中，我们需要动态导入合约ABI
let NFT: any;

// 在客户端环境中加载合约ABI
if (typeof window !== 'undefined') {
  // 这里需要根据实际项目结构调整路径
  import("../artifacts/contracts/ArtistNFT.sol/ArtistNFT.json")
    .then((module) => {
      NFT = module.default;
    })
    .catch((error) => {
      console.error("Failed to load NFT contract ABI:", error);
    });
}

// 获取当前用户拥有的所有NFT
export const owned = async (type: string): Promise<{ success: boolean; data: Nft[] }> => {
  // 尝试链接区块链网络
  const { success, provider, signer } = await trying();
  if (!success) {
    return { success: false, data: [] };
  }

  // 确保NFT合约ABI已加载
  if (!NFT) {
    console.error("NFT contract ABI not loaded");
    return { success: false, data: [] };
  }

  // 获取用户钱包地址
  const address = await signer?.getAddress();
  // 创建NFT合约实例
  const nft = new ethers.Contract(
    configuration().nftAddress,
    NFT.abi,
    provider
  );

  // 查询用户拥有的NFT数量
  const count = await nft.balanceOf(address);
  // 将数量转换为数字
  const amount = Number(count);

  // 获取每个NFT的详细信息
  const nfts: Nft[] = [];
  for (let i = 0; i < amount; i++) {
    // 获取用户拥有的第i个NFT的tokenId
    const tokenId = await nft.tokenOfOwnerByIndex(address, i);
    // 获取该tokenId对应的URI
    const tokenUri = await nft.tokenURI(tokenId);
    // 从URI获取元数据
    const meta = await fetchNftMeta(tokenUri);
    // 构建NFT对象
    nfts.push({
      tokenId: tokenId.toString(),
      tokenUri,
      name: meta.name,
      description: meta.description,
      imageUri: meta.imageUri,
      uri: meta.uri,
      type: meta.type,
    });
  }

  return { success: true, data: nfts };
};

// 从URI获取NFT元数据
const fetchNftMeta = async (uri: string) => {
  const res = await axios.get(uri);
  return res.data;
};

// 铸造NFT
export const mintNFT = async (tokenUri: string, name: string) => {
  // 尝试链接区块链网络
  const { success, provider, signer } = await trying();
  if (!success) {
    throw new Error("Failed to connect to blockchain");
  }

  // 确保NFT合约ABI已加载
  if (!NFT) {
    throw new Error("NFT contract ABI not loaded");
  }

  // 创建NFT合约实例（使用signer以便可以发送交易）
  const nft = new ethers.Contract(
    configuration().nftAddress,
    NFT.abi,
    signer
  );

  // 调用合约的mint方法铸造NFT
  const transaction = await nft.mint(tokenUri);
  // 等待交易被确认
  const tx = await transaction.wait();
  return tx;
};