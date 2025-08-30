import { ethers } from "ethers";
import Lock from "./artifacts/contracts/Lock.sol/Lock.json"
import './App.css';
function App() {
  const connect = async () => {
    if (window.ethereum) {
      // 连接到 MetaMask 的 EIP-1193 对象（标准协议，允许 Ethers 通过 MetaMask 进行只读请求）
      const provider = new ethers.BrowserProvider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      // 请求写权限，使用 MetaMask 管理的私钥
      const signer = await provider.getSigner();
      console.log(signer);
      const addr = await signer.getAddress();
      console.log(addr);
    } else {
      alert("Please install MetaMask");
    }
  };

  const readMessage = async () => {
    if (window.ethereum) {
      // 创建一个 Ethers.js 提供者对象
      const provider = new ethers.BrowserProvider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const lock = new ethers.Contract("0x5FbDB2315678afecb367f032d93F642f64180aa3", Lock.abi, provider);
      const message = await lock.message();
      alert(message);
    }
  }

  const writeMessage = async () => {
    if (window.ethereum) {
      const provider = new ethers.BrowserProvider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      // 一定记得加await
      const signer = await provider.getSigner();
      let lock = new ethers.Contract("0x5FbDB2315678afecb367f032d93F642f64180aa3", Lock.abi, signer);
      let transaction = await lock.connect(signer).setMessage("world hello");
      let tx = await transaction.wait(1);
      // v6版本API更新
      // let event = tx.events[0];
      const log = tx.logs[0]; // 假设第一个日志是目标事件
      let event = lock.interface.parseLog(log);
      let value = event.args[0];

      let message = value.toString();
      alert(message);
    }
  }

  return (
    <div className="App">
      <button onClick={connect}>Connect Wallet </button>
      <button onClick={readMessage}>readMessage</button>
      <button onClick={writeMessage}>writeMessage</button>
    </div>
  );
}

export default App;
