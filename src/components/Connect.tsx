// import { ethers } from "ethers";
import { connect } from "../service/connection-service";
import "react-notifications-component/dist/theme.css";
import { Link } from "react-router-dom";
function Connect() {
  const connectWallet = async () => {
    try {
      await connect();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Link to={"/"} onClick={connectWallet}>
      connect
    </Link>
  );
}

export default Connect;
