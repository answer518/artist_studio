import { ethers } from "hardhat";
function Connect() {
  const connectWallet = async () => {
    // @ts-ignore
    const provider = new ethers.BrowserProvider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    // const addr = await signer.getAddress();
  };

  return (
    <div>
      <button onClick={connectWallet}>Connect Wallet</button>
    </div>
  );
}

export default Connect;
