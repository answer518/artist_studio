import { ethers } from "ethers";
import axios from "axios";

import { trying } from "./connection-service";
import { Nft } from "./types";
import NFT from "../artifacts/contracts/ArtistNFT.sol/ArtistNFT.json";
import { configuration, rpcUrl } from "../config";

// 获取当前用户拥有的所有NFT
export const owned = async (): Promise<{ success: boolean; data: Nft[] }> => {
  // 尝试链接区块链网络
  const { success, provider, signer } = await trying();
  if (!success) {
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

  const rst = await Promise.all(
    Array.from({ length: amount }, async (v, i) => {
      // 获取第i个NFT的tokenId
      const tokenId = await nft.tokenOfOwnerByIndex(address, i);
      // 获取NFT的元数据URI
      const tokenURI = await nft.tokenURI(tokenId);
      // 从URI中获取NFT元数据
      const meta = await axios.get(tokenURI);
      // 返回NFT完整信息
      return { ...meta.data, tokenId, tokenURI };
    })
  );

  return { success: true, data: rst };
};

export const ownedTypeNFT = async (
  type: string
): Promise<{ success: boolean; data: Nft[] }> => {
  let { success, data } = await owned();
  if (!success) {
    return { success, data };
  }
  let rst = data.filter((e: Nft) => e.type === type);
  return { success: true, data: rst };
};

export const totalsupply = async (): Promise<number> => {
  const provider = new ethers.JsonRpcProvider(rpcUrl());
  const nft = new ethers.Contract(
    configuration().nftAddress,
    NFT.abi,
    provider
  );
  const total = await nft.totalSupply();
  return total;
};

export const mintNFT = async (
  tokenUri: String
): Promise<{ success: boolean; tokenId?: number }> => {
  const { success, signer } = await trying();
  if (!success || !signer) {
    // NotificationManager.warning('', "network not right!", 6000);
    return { success: false };
  }

  let nft = new ethers.Contract(configuration().nftAddress, NFT.abi, signer);
  const address = await signer.getAddress();
  // @ts-ignore
  let transaction = await nft.connect(signer).mint(address, tokenUri);
  // 等待全网确认，矿工处理
  let tx = await transaction.wait(1);
  const log = tx.logs[0]; // 假设第一个日志是目标事件
  let event = nft.interface.parseLog(log);
  let value = event?.args[2];
  // console.log(value);
  let tokenId = Number(value);
  return { success: true, tokenId };
};
