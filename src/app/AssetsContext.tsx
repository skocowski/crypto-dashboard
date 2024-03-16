'use client'

import { AssetMap, AssetsContextType, CoinMap, NetworkMap, Summary, WalletMap } from "@/utils/interfaces";
import { ReactNode, createContext, useContext, useEffect, useState } from "react";

import axios from "axios";
import { BASE_URL, assetsContextDefaultValues, chains, summaryInitial } from "@/utils/Constants";

const AssetsContext = createContext<AssetsContextType>(assetsContextDefaultValues);

export function useAssets() {
    return useContext(AssetsContext)
}

type Props = {
    children: ReactNode;
};

export const AssetsProvider = ({ children }: Props) => {
    const [wallets, setWallets] = useState<WalletMap>({})
    const [assets, setAssets] = useState<AssetMap>({})
    const [filteredAssets, setFilteredAssets] = useState<AssetMap>({})
    const [coins, setCoins] = useState<CoinMap>({})
    const [networks, setNetworks] = useState<NetworkMap>(chains);
    const [glpPrice, setGlpPrice] = useState<number>(0)
    const [glpAPR, setGlpAPR] = useState<string>("")
    const [summary, setSummary] = useState<Summary>(summaryInitial);

    const [filteredSummary, setFilteredSummary] = useState<Summary>(summaryInitial);

    const [fetching, setFetching] = useState<boolean>(false)
    const [addingWallet, setAddingWallet] = useState<boolean>(false)

    /*     useEffect(() => {
            localStorage.setItem("wallets", JSON.stringify(wallets));
        }, [wallets]); */


    useEffect(() => {
        setCoins(generateCoins(assets))
        setSummary(calculateSummary(assets))
    }, [assets])

    useEffect(() => {
        setFilteredSummary(calculateSummary(filteredAssets))
    }, [filteredAssets])

    useEffect(() => {
        setFilteredAssets(filterAssets(assets, wallets, networks, coins)) 
    }, [networks, wallets, coins])


    useEffect(() => {
        const fetchGlpPrice = async () => {
            try {
                const response = await axios.get<string>(`${BASE_URL}/api/glp/price`);
                setGlpPrice(Number(response.data))
            } catch (error) {
                console.error('Error fetching glp price:', error);
            }
        };

        const fetchGlpAPR = async () => {
            try {
                const response = await axios.get<string>(`${BASE_URL}/api/glp/apr`);
                setGlpAPR(response.data)
            } catch (error) {
                console.error('Error fetching glp price:', error);
            }
        };

        fetchGlpPrice();
        fetchGlpAPR()

        // Clean-up function (optional)
        return () => {
            // Perform any cleanup tasks if needed
        };
    }, []);


    const value = {
        wallets,
        setWallets,
        assets,
        setAssets,
        filteredAssets,
        setFilteredAssets,
        coins,
        setCoins,
        networks,
        setNetworks,
        glpPrice,
        glpAPR,
        summary,
        setSummary,
        filteredSummary,
        setFilteredSummary,
        fetching,
        setFetching,
        addingWallet,
        setAddingWallet
    }

    return (

        <AssetsContext.Provider value={value}>
            {children}
        </AssetsContext.Provider>

    )

    function generateCoins(assets: AssetMap) {

        // Create a CoinMap to store merged tokens
        const mergedTokens: CoinMap = {}

        // Iterate through all wallets in the AssetMap
        Object.values(assets).forEach(asset => {
            const { tokens } = asset; // Get tokens for the current wallet

            // Iterate through tokens and merge them based on symbol
            tokens.forEach(token => {
                const { symbol, balance, usdValue, logo, name } = token;

                if (!mergedTokens[symbol]) {
                    // If token symbol doesn't exist in mergedTokens, add it
                    mergedTokens[symbol] = { symbol, balance, usdValue, logo, name, isChecked: false };
                } else {
                    // If token symbol already exists in mergedTokens, merge balance and usdValue
                    mergedTokens[symbol].balance += balance;
                    mergedTokens[symbol].usdValue += usdValue;
                }
            });
          

        })
              return mergedTokens
    }



    function filterAssets(assets: AssetMap, wallets: WalletMap, networks: NetworkMap, coins: CoinMap) {
        const filteredByWallet = filterAssetsByWallet(assets, wallets);
        const filteredByChain = filterAssetsByChain(filteredByWallet, networks)
        const filteredByCoin = filterAssetsByCoin(filteredByChain, coins)
        return filteredByCoin;
    }
    
    function filterAssetsByWallet(assets: AssetMap, wallets: WalletMap) {
        const checkedWalletAddresses = Object.keys(wallets).filter(walletAddress => wallets[walletAddress].isChecked);

        const checkedAssets: AssetMap = {};

        checkedWalletAddresses.forEach(walletAddress => {
            if (assets.hasOwnProperty(walletAddress)) {
                checkedAssets[walletAddress] = assets[walletAddress];
            }
        });

        return checkedAssets;
    }

    function filterAssetsByChain(assets: AssetMap, networks: NetworkMap): AssetMap {
        const checkedChains = Object.keys(networks).filter(chain => networks[chain].isChecked);

        // If no chain is checked, return all assets
        if (checkedChains.length === 0) {
            return assets;
        }

        // Otherwise, filter assets based on the checked chains
        const checkedAssets: AssetMap = {};

        Object.entries(assets).forEach(([walletAddress, asset]) => {
            const filteredTokens = asset.tokens.filter(token => checkedChains.includes(token.chain));
            const filteredNativeTokens = asset.native.filter(nativeToken => checkedChains.includes(nativeToken.chain));
            const filteredGlp = asset.glp.chain && checkedChains.includes(asset.glp.chain) ? asset.glp :
                {
                walletAddress: asset.glp.walletAddress,
balance: 0,
rewards: 0,
chain: asset.glp.chain,
usdValue: 0
};



            if (filteredTokens.length > 0 || filteredNativeTokens.length > 0 || filteredGlp) {
                checkedAssets[walletAddress] = { tokens: filteredTokens, native: filteredNativeTokens, glp: filteredGlp };
            }
        });

        return checkedAssets;
    }

    function filterAssetsByCoin(assets: AssetMap, coins: CoinMap): AssetMap {
        const checkedCoins = Object.keys(coins).filter(symbol => coins[symbol].isChecked);

        // If no chain is checked, return all assets
        if (checkedCoins.length === 0) {
            return assets;
        }

        // Otherwise, filter assets based on the checked chains
        const checkedAssets: AssetMap = {};

        Object.entries(assets).forEach(([walletAddress, asset]) => {
            const filteredTokens = asset.tokens.filter(token => checkedCoins.includes(token.symbol));
            const filteredNativeTokens = asset.native
            const glp = asset.glp

            if (filteredTokens.length > 0) {
                checkedAssets[walletAddress] = { tokens: filteredTokens, native: filteredNativeTokens, glp: glp };
            }
        });

        return checkedAssets;
    }

}

const calculateSummary = (assets: AssetMap) => {
    let tokensValueUSD = 0;
    let nativeTokensValueUSD = 0;
    let glpValueUSD = 0
    const walletsSummary: { [walletAddress: string]: { tokensValueUSD: number, nativeTokensValueUSD: number, glpValueUSD: number } } = {};
    const chainsValueUSD: { [chain: string]: number } = {};

    // Iterate through assets to calculate summaries
    Object.values(assets).forEach(asset => {
        asset.tokens.forEach(token => {
            tokensValueUSD += token.usdValue;
            const walletAddress = token.walletAddress;
            // Calculate wallet summary for tokens
            if (walletsSummary[walletAddress] === undefined) {
                walletsSummary[walletAddress] = { tokensValueUSD: token.usdValue, nativeTokensValueUSD: 0, glpValueUSD: 0 };
            } else {
                walletsSummary[walletAddress].tokensValueUSD += token.usdValue;
            }
            // Calculate chain summary
            if (chainsValueUSD[token.chain] === undefined) {
                chainsValueUSD[token.chain] = token.usdValue;
            } else {
                chainsValueUSD[token.chain] += token.usdValue;
            }
        });

        asset.native.forEach(nativeToken => {
            nativeTokensValueUSD += nativeToken.usdValue;
            const walletAddress = nativeToken.walletAddress;
            // Calculate wallet summary for native tokens
            if (walletsSummary[walletAddress] === undefined) {
                walletsSummary[walletAddress] = { tokensValueUSD: 0, nativeTokensValueUSD: nativeToken.usdValue, glpValueUSD: 0 };
            } else {
                walletsSummary[walletAddress].nativeTokensValueUSD += nativeToken.usdValue;
            }
            // Calculate chain summary for native tokens
            if (chainsValueUSD[nativeToken.chain] === undefined) {
                chainsValueUSD[nativeToken.chain] = nativeToken.usdValue;
            } else {
                chainsValueUSD[nativeToken.chain] += nativeToken.usdValue;
            }
        });
        

        glpValueUSD += asset.glp.balance
        // Calculate wallet summary for GLP
        if (walletsSummary[asset.glp.walletAddress] === undefined) {
            walletsSummary[asset.glp.walletAddress] = { tokensValueUSD: 0, nativeTokensValueUSD: 0, glpValueUSD: asset.glp.usdValue };
        } else {
            walletsSummary[asset.glp.walletAddress].glpValueUSD += asset.glp.usdValue;
        }
        // Calculate chain summary for GLP
        if (chainsValueUSD[asset.glp.chain] === undefined) {
            chainsValueUSD[asset.glp.chain] = asset.glp.usdValue;
        } else {
            chainsValueUSD[asset.glp.chain] += asset.glp.usdValue;
        }
        

        
    });

    // Set the updated summary object
    return {
        tokensValueUSD,
        nativeTokensValueUSD,
        chainsValueUSD,
        glpValueUSD,
        all: tokensValueUSD + nativeTokensValueUSD + glpValueUSD,
        walletsSummary,
    };
};



