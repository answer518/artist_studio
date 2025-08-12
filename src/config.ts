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

const confs: NetworkConfiguration[] = [
  {
    chainId: 0x7a69,
    nftAddress:
      "0xbda9d64384af0ade468fec455e98ddf95fd2b0fb2d16792ca0e2c65e9c2973d7",
    params: [
      {
        chainId: "0x539",
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
