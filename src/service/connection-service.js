import { ethers } from "ethers";
import { messageBox } from "../service/message-service"
import { configuration } from '../config'

export const connectOnce = async () => {
    // debugger;
    let provider = new ethers.BrowserProvider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    let signer = await provider.getSigner();
    let network = await provider.getNetwork();
    let address = await signer.getAddress();
    return { chainId: network.chainId, address: address, provider, signer };
}
export const trying = async () => {
    const { chainId, address, provider, signer } = await connectOnce();
    const supported = configuration().chainId.toString();

    if (chainId.toString() === supported) {
        messageBox("success", "", 'chainId: ' + chainId + "      account: " + address.substring(0, 5) + "..")
        return { success: true, provider, signer };
    }

    messageBox("warning", "", 'chainId: ' + chainId + "      account: " + address.substring(0, 5) + "..")
    return { success: false };
}
export const connect = async () => {
    let { success } = await trying();
    if (success) {
        return;
    }
    const conf = configuration()
    // 向MetaMask钱包添加新的以太坊网络配置
    await window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: conf.params

    });
    await trying();
}