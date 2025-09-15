'use client';
import { connect } from "../../service/connection-service";
import "react-notifications-component/dist/theme.css";
import Link from "next/link";

function Connect() {
  const connectWallet = async () => {
    try {
      await connect();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Link href="/" onClick={connectWallet}>
      connect
    </Link>
  );
}

export default Connect;