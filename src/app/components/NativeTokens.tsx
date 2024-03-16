import { AssetMap, NativeToken } from '@/utils/interfaces'
import React, { useEffect, useState } from 'react'
import { useAssets } from '../AssetsContext'
import Image from 'next/image'
import millify from 'millify'


const NativeTokens = () => {
    const { filteredAssets } = useAssets()
    const [tokens, setTokens] = useState<NativeToken[]>([]);

    useEffect(() => {
        mergeTokensByChain(filteredAssets)
    }, [filteredAssets])

    return (
        <>
            <div className="block w-full p-3 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <h3 className="mb-5 text-lg font-medium text-gray-900 dark:text-white">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
                        Native Tokens
                    </span>
                </h3>
                <ul className="block justify-center space-y-3">
                    <li>
                        <Card tokens={tokens} chain="ethereum" />
                    </li>
                    <li>
                        <Card tokens={tokens} chain="arbitrum" />
                    </li>
                    <li>
                        <Card tokens={tokens} chain="polygon" />
                    </li>
                    <li>
                        <Card tokens={tokens} chain="optimism" />
                    </li>
                </ul>

            </div>

        </>
    )

    function mergeTokensByChain(assets: AssetMap) {
        const mergedTokensByChain: { [key: string]: { balance: number; usdValue: number } } = {};

        for (const walletAddress in assets) {
            if (Object.prototype.hasOwnProperty.call(assets, walletAddress)) {
                const asset = assets[walletAddress];
                for (const nativeToken of asset.native) {
                    const { chain, balance, usdValue } = nativeToken;
                    if (!mergedTokensByChain[chain]) {
                        mergedTokensByChain[chain] = { balance: 0, usdValue: 0 };
                    }
                    mergedTokensByChain[chain].balance += balance;
                    mergedTokensByChain[chain].usdValue += usdValue;
                }
            }
        }

        const mergedTokensArray = Object.entries(mergedTokensByChain).map(([chain, { balance, usdValue }]) => ({
            chain,
            balance,
            usdValue,
            walletAddress: "" 
        }));

        setTokens(mergedTokensArray);
    }
}

export default NativeTokens

type CardProps = {
    tokens: NativeToken[],
    chain: string
}

const Card = ({tokens, chain} : CardProps) => {
    return (
        <div className="flex items-center justify-between space-x-2 w-full">
            <div className='flex space-x-2 items-center'>
                <Image
                    src={`/assets/${chain}.png`}
                    alt=""
                    width={20}
                    height={20}

                />
                <p className="text-sm font-medium text-gray-900 truncate dark:text-white capitalize capitalize">
                    {chain}
                </p>
            </div>
            <div className="text-right flex space-x-2">
                <div className="text-sm font-medium text-gray-900 truncate dark:text-white uppercase">
                    {millify(tokens.find(token => token.chain === chain)?.balance || 0)}
                </div>
                <div className="text-sm text-gray-500 truncate dark:text-gray-400 capitalize">
                    (${millify(tokens.find(token => token.chain === chain)?.usdValue || 0)})
                </div>
            </div>
        </div>
    )
}

