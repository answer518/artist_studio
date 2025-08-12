/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */
// import { ethers } from "ethers";
import { connect } from "../service/connection-service";
import "react-notifications-component/dist/theme.css";
function Connect() {
  const connectWallet = async () => {
    try {
      await connect();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <a href="javascript: void(0);" onClick={connectWallet}>
        connect
      </a>
    </div>
  );
}

export default Connect;
