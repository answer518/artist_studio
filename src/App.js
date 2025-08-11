import './App.css';
import { ethers } from "ethers";
function App() {
  const connect = async () => {
    if (window.ethereum) {
      debugger;
      const provider = new ethers.BrowserProvider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
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
