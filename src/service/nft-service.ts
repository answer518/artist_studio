import { ethers } from "ethers";
import axios from "axios";
import { Nft } from "./types";
import NFT_ABI from "../../artifacts/contracts/ArtistNFT.sol/ArtistNFT.json";
import { configuration, rpcUrl } from "../config";
import { trying } from "./connection-service";

export const owned = async (): Promise<{ success: boolean; data: Nft[] }> => {
  const { success, provider, signer } = await trying();
  if (!success) {
    return { success: false, data: [] };
  }

  const address = await signer?.getAddress();
  const nft = new ethers.Contract(
    configuration().nftAddress,
    NFT_ABI.abi,
    provider
  );

  const count = await nft.balanceOf(address);
  const amount = count.toNumber();

  const rst = await Promise.all(
    Array.from({ length: amount }, async (v, i) => {
      const tokenId = await nft.tokenOfOwnerByIndex(address, i);
      const tokenURI = await nft.tokenURI(tokenId);
      const meta = await axios.get(tokenURI);
      return { ...meta.data, tokenId, tokenURI };
    })
  );

  return { success: true, data: rst };
};

export const totalsupply = async (): Promise<number> => {
  const provider = new ethers.JsonRpcProvider(rpcUrl());
  const nft = new ethers.Contract(
    configuration().nftAddress,
    NFT_ABI.abi,
    provider
  );
  const total = await nft.totalSupply();
  return total;
};

export const mintNFT = async (
  tokenURI: string
): Promise<{ success: boolean; tokenId?: string }> => {
  const { success, signer } = await trying();
  if (!success || !signer) {
    return { success: false };
  }

  let nft = new ethers.Contract(
    configuration().nftAddress,
    NFT_ABI.abi,
    signer
  );
  const address = await signer.getAddress();
  const transaction = await nft.connect(signer).mint(tokenURI);
  const tx = await transaction.wait(1);
  let event = tx.events[0];
  let value = event.args[2];

  let tokenId = value.toNumber();
  return { success: true, tokenId };
};
