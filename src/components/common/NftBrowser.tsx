import styles from "./BftBrowser.module.css";
import type { Nft } from "../../service/types";
import NftCard from "./NftCard";
function NftBrowser({ nfts }: { nfts: Nft[] }) {
  return (
    <div className={styles.main}>
      {nfts.map((nft) => {
        return <NftCard nft={nft} />;
      })}
    </div>
  );
}

export default NftBrowser;
