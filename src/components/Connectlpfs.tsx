import { Link } from "react-router-dom";
import { storeMeta } from "../service/ipfs-service";
import "react-notifications-component/dist/theme.css";
function Connectlpfs() {
  const connectIpfs = async () => {
    await storeMeta({ name: "zhangsan" });
  };

  return (
    <Link to="/" onClick={connectIpfs}>
      connectIpfs
    </Link>
  );
}

export default Connectlpfs;
