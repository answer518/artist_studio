import { Button, Input } from "antd";

import { useNavigate } from "react-router-dom";
import styles from "./NftMintor.module.css";
import { useState } from "react";
import { NftMeta } from "../../service/types";
import { addToIpfs } from "../../service/ipfs-service";
import { messageBox } from "../../service/message-service";
const props = {
  name: "file",
  action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
  headers: {
    authorization: "authorization-text",
  },
};
function NftMintor() {
  const navigate = useNavigate();
  const [meta, setMeta] = useState<NftMeta>({
    name: "",
    description: "",
    imageUri: "",
  });
  const [uri, setUri] = useState("");
  const store = async (file: any) => {
    try {
      const imageUri = await addToIpfs(file);
      messageBox("success", "", imageUri);
      setUri(imageUri);
    } catch (error) {
      if (error instanceof Error) {
        messageBox("danger", "", error.message);
      }
    }
  };

  const mint = async () => {};

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
