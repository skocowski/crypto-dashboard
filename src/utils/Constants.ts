import { Network } from "alchemy-sdk";
import { AssetsContextType } from "./interfaces";

export const BASE_URL = "http://localhost:3000";

export const alchemyNetworks = [
  Network.ETH_MAINNET,
  Network.ARB_MAINNET,
  Network.OPT_MAINNET,
  Network.MATIC_MAINNET,
];
export const networksList = ["ethereum", "arbitrum", "optimism", "polygon"];

export const chains = {
  ethereum: {
    name: "ethereum",
    isChecked: false,
    image: "/assets/ethereum.png",
    chain: "ethereum",
  },
  arbitrum: {
    name: "arbitrum",
    isChecked: false,
    image: "/assets/arbitrum.png",
    chain: "arbitrum",
  },
  polygon: {
    name: "polygon",
    isChecked: false,
    image: "/assets/polygon.png",
    chain: "polygon",
  },
  optimism: {
    name: "optimism",
    isChecked: false,
    image: "/assets/optimism.png",
    chain: "optimism",
  },
};

export const summaryInitial = {
  tokensValueUSD: 0,
  nativeTokensValueUSD: 0,
  glpValueUSD: 0,
  chainsValueUSD: {},
  all: 0,
  walletsSummary: {},
};

export const assetsContextDefaultValues: AssetsContextType = {
  wallets: {},
  setWallets: () => {},
  assets: {},
  setAssets: () => {},
  filteredAssets: {},
  setFilteredAssets: () => {},
  coins: {},
  setCoins: () => {},
  networks: {},
  setNetworks: () => {},
  glpPrice: 0,
  glpAPR: "",
  summary: {
    tokensValueUSD: 0,
    nativeTokensValueUSD: 0,
    glpValueUSD: 0,
    chainsValueUSD: {},
    all: 0,
    walletsSummary: {},
  },
  setSummary: () => {},
  filteredSummary: {
    tokensValueUSD: 0,
    nativeTokensValueUSD: 0,
    glpValueUSD: 0,
    chainsValueUSD: {},
    all: 0,
    walletsSummary: {},
  },
  setFilteredSummary: () => {},
  fetching: false,
  setFetching: () => {},
  addingWallet: false,
  setAddingWallet: () => {},
};