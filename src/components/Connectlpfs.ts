import { storeMeta } from "../service/ipfs-service";
import "react-notifications-component/dist/theme.css";
function Connectlpfs() {
  const connectIpfs = async () => {
    await storeMeta({ name: "zhangsan" });
  };
  return (
    <div>
      <a href="javascript:void(0);" onClick={connectIpfs}>
        connectIpfs
      </a>
    </div>
  );
}

export default Connectlpfs;
