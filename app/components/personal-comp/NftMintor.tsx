'use client';

import { Button, Input, message } from "antd";
import { useRouter } from "next/navigation";
import styles from "./NftMintor.module.css";
import { useState } from "react";
import { NftMeta } from "../../service/types";
import { addToIpfs } from "../../service/ipfs-service";
import { mintNFT } from "../../service/nft-service";

function NftMintor() {
  const router = useRouter();
  const [meta, setMeta] = useState<NftMeta>({
    name: "",
    description: "",
    imageUri: "",
    uri: "",
    type: "",
  });
  const [uri, setUri] = useState("");
  
  const store = async (file: any) => {
    try {
      const imageUri = await addToIpfs(file);
      message.success(imageUri);
      setUri(imageUri);
    } catch (error) {
      if (error instanceof Error) {
        message.error(error.message);
      }
    }
  };

  const mint = async () => {
    try {
      const data: NftMeta = { ...meta, imageUri: uri, type: "image" };
      const json = JSON.stringify(data);
      const metauri = await addToIpfs(json);
      message.success(metauri);
      const { success, tokenId } = await mintNFT(metauri);

      if (success && tokenId) {
        message.success(`Minted NFT with tokenId ${tokenId}`);
        router.push(`/personal?selectedKey=collectible-browse`);
      } else {
        message.error("Minting NFT failed");
      }
    } catch (error) {
      if (error instanceof Error) {
        message.error(error.message);
      }
    }
  };

  return (
    <div className={styles.CreatorWrapper}>
      <div className={styles.CreatorContainer}>
        <Input
          placeholder="Asset Name"
          className={styles.NftField}
          onChange={(e) => {
            setMeta({ ...meta, name: e.target.value });
          }}
        />

        <Input.TextArea
          placeholder="Asset Description"
          className={styles.NftField}
          onChange={(e) => {
            setMeta({ ...meta, description: e.target.value });
          }}
        />

        <Input
          type="file"
          placeholder="Asset Image"
          className={styles.NftField}
          onChange={(e) => {
            e.target.files && store(e.target.files[0]);
          }}
        />

        <img width="350" src={uri} className={styles.NftImage} alt="NFT图片" />

        <Button type="primary" onClick={mint}>
          铸币
        </Button>
      </div>
    </div>
  );
}

export default NftMintor;