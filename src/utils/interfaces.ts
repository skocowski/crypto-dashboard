
import { Dispatch, SetStateAction } from "react";

export interface AssetMap {
  [walletAddress: string]: Asset
}

export interface Asset {
  tokens: Token[]
  native: NativeToken[]
  glp: GlpToken
}

export interface WalletMap {
  [walletAddress: string]: Wallet;
}

export interface Wallet {
  walletAddress: string;
  isChecked: boolean;
}

export interface TokenMap {
  [contractAddress: string] : Token
}

export interface Token {
  contractAddress: string;
  tokenBalance?: string; // This appears to be a hexadecimal string representing a token balance
  symbol: string;
  name: string;
  logo: string;
  walletAddress: string;
  chain: string;
  decimals?: number;
  usdValue: number;
  balance: number;
  price: number
}

export interface NativeToken {
  chain: string;
  balance: number;
  walletAddress: string;
  usdValue: number;
}

export interface TokenBalancesResponse {
  address: string; // The address for which the token balances are retrieved
  tokenBalances: Token[] | any; // An array of token balances or any other type
}

export interface TokenPrice {
  symbol: string;
  current_price: number;
}

export interface CoinMap {
  [symbol: string] : Coin
}

export interface Coin {
symbol: string
  isChecked: boolean;
  logo: string;
  balance: number;
  name: string;
  usdValue: number;
}

export interface NetworkMap {
  [networkName: string]: Network;
}

export interface Network {
  name: string;
  isChecked: boolean;
  image: string;
  chain: string
}



export interface GlpToken {
  walletAddress: string
  balance: number
  rewards: number
  chain: string
  usdValue: number
}



export interface TokenPriceInt {
  symbol: string;
  current_price: number;
}

export interface WalletUsdValues {
  [walletAddress: string]: number;
}

export interface Summary {
  tokensValueUSD: number;
  nativeTokensValueUSD: number;
  chainsValueUSD: { [chain: string]: number };
  glpValueUSD: number;
  all: number;
  walletsSummary: {
    [walletAddress: string]: {
      tokensValueUSD: number;
      nativeTokensValueUSD: number;
      glpValueUSD: number;
    };
  };
}

export interface AssetsContextType {
  wallets: WalletMap;
  setWallets: Dispatch<SetStateAction<WalletMap>>;
  assets: AssetMap;
  setAssets: Dispatch<SetStateAction<AssetMap>>;
  filteredAssets: AssetMap;
  setFilteredAssets: Dispatch<SetStateAction<AssetMap>>;
  coins: CoinMap;
  setCoins: Dispatch<SetStateAction<CoinMap>>;
  networks: NetworkMap;
  setNetworks: Dispatch<SetStateAction<NetworkMap>>;
  glpPrice: number;
  glpAPR: string;
  summary: Summary;
  setSummary: Dispatch<SetStateAction<Summary>>;
  filteredSummary: Summary;
  setFilteredSummary: Dispatch<SetStateAction<Summary>>;
  fetching: boolean;
  setFetching: Dispatch<SetStateAction<boolean>>;
  addingWallet: boolean;
  setAddingWallet: Dispatch<SetStateAction<boolean>>;
};