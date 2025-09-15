'use client';

import { create as ipfsHttpClient } from "ipfs-http-client";
import axios from "axios";

import { IPFS } from "../config";

const ipfs = ipfsHttpClient({
  host: IPFS.domain,
  port: 5001,
  // protocal: "http",
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

export const addToIpfs = async (title: string, content: string): Promise<string> => {
  // 创建包含标题和内容的对象
  const entity = JSON.stringify({
    title,
    content
  });
  
  // 添加到IPFS
  const added = await ipfs.add(entity);
  const cid = added.path;
  const rst = IPFS.url_prefix + cid;
  return rst;
};

export const readArticle = async (uri: string): Promise<string> => {
  const res = await axios.get(uri);
  return res.data;
};