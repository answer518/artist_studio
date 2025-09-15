'use client';

import styles from "./BftBrowser.module.css";
import type { Nft } from "../../../service/types";
import NftCard from "../../../components/common/NftCard";

function NftBrowser({ nfts }: { nfts: Nft[] }) {
  return (
    <div className={styles.main}>
      {nfts.map((nft) => {
        return <NftCard key={nft.tokenId} nft={nft} />;
      })}
    </div>
  );
}

export default NftBrowser;