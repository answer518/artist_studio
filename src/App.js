import './App.css';
import { ethers } from "ethers";
function App() {
  const connect = async () => {
    if (window.ethereum) {
      // 连接到 MetaMask 的 EIP-1193 对象（标准协议，允许 Ethers 通过 MetaMask 进行只读请求）
      const provider = new ethers.BrowserProvider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      // 请求写权限，使用 MetaMask 管理的私钥
      const signer = provider.getSigner();
      console.log(signer);
    } else {
      alert("Please install MetaMask");
    }

  };
  return (
    <div className="App">
      <button onClick={connect}>Connect Wallet </button>
    </div>
  );
}

export default App;
