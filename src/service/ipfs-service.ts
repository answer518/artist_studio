import { create as ipfsHttpClient } from "ipfs-http-client";
import { IPFS } from "../config";
// import axios from "axios";
const ipfs = ipfsHttpClient({
  host: IPFS.domain,
  port: 5001,
  protocal: "http",
});
export const storeMeta = async (data: any) => {
  const json = JSON.stringify(data);
  try {
    const added = await ipfs.add(json);
    alert(added.path);
  } catch (error) {
    console.log(error);
  }
};

export const addToIpfs = async (entity: any): Promise<string> => {
  debugger;
  const added = await ipfs.add(entity);
  const cid = added.path;
  const rst = IPFS.url_prefix + cid;
  return rst;
};
