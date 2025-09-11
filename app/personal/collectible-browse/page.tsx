'use client';

import { useEffect, useState } from "react";
import NftBrowser from "./components/NftBrowser";
import { owned } from "../../service/nft-service";
import { Nft } from "../../service/types";

function MyNft() {
  const [nfts, setNfts] = useState<Nft[]>([]);

  useEffect(() => {
    // loadNfts();
  }, []);

  const loadNfts = async () => {
    const ns = await owned("image");
    if (ns.success) {
      setNfts(ns.data);
    }
    console.log("mounted!");
  };
  return (
    <div className="main">
      <NftBrowser nfts={nfts} />
    </div>
  );
}
export default MyNft;