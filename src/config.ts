type NetworkConfiguration = {
  chainId: number;
  nftAddress: string;
  params: {
    chainId: string;
    rpcUrls: string[];
    chainName: string;
    nativeCurrency: {
      name: string;
      symbol: string;
      decimals: number;
    };
    blockExplorerUrls: string[];
  }[];
};

// 网络配置管理：遵循应用为主，钱包为辅的原则
const confs: NetworkConfiguration[] = [
  {
    chainId: 0x7a69,
    nftAddress: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
    params: [
      {
        chainId: "0x7a69",
        rpcUrls: ["http://127.0.0.1:8545/"],
        chainName: "localhost-hardhat",
        nativeCurrency: {
          name: "ETH",
          symbol: "ETH",
          decimals: 18,
        },
        blockExplorerUrls: ["https://polygonscan.com/"],
      },
    ],
  },
  {
    chainId: 0x0539,
    nftAddress:
      "0x7601f5239785b3f8f0eade2ab9d1023b73eba74e8d36e084b7207f9db03259f5",
    params: [
      {
        chainId: "0x0539",
        rpcUrls: ["http://127.0.0.1:8545/"],
        chainName: "localhost-ganache",
        nativeCurrency: {
          name: "GETH",
          symbol: "GETH",
          decimals: 18,
        },
        blockExplorerUrls: ["https://polygonscan.com/"],
      },
    ],
  },
];

export const configuration = () => confs[selection];
const selection = 0;
export const rpcUrl = () => {
  return confs[selection].params[0].rpcUrls[0];
};

export const IPFS = {
  domain: "127.0.0.1",
  url_prefix: "http://127.0.0.1:8080/ipfs/",
};
