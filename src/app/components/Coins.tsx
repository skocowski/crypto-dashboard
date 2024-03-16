import { Coin  } from '@/utils/interfaces'
import React, { ChangeEvent } from 'react'
import { useAssets } from '../AssetsContext';
import millify from 'millify';
import Image from 'next/image';

const Coins = () => {
    
    const { coins } = useAssets()

    return (
        <div className="">
            <div className="block w-full p-3 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <h3 className="mb-5 text-lg font-medium text-gray-900 dark:text-white">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
                        Choose coin:
                    </span>
                </h3>
                <ul className="block justify-center space-y-2">
                    {Object.keys(coins).map((symbol, index) => {
                        const coin = coins[symbol];
                        return (
                            <li key={index}>
                                <Card
                                    coin={coin}
                                />
                            </li>
                        )
                    })}
                </ul>
            </div>
        </div>
    )
}

export default Coins

type CardProps = {
    coin: Coin
}

const Card = ({ coin }: CardProps) => {
    const { setCoins, summary } = useAssets()

    return (
        <>
            <input
                type="checkbox"
                id={coin.symbol}
                value=""
                checked={coin.isChecked}
                onChange={(event) => handleChange(coin.symbol, event)}
                className="hidden peer"
            />
            <label
                htmlFor={coin.symbol}
                className="flex items-center justify-between w-full p-1 text-gray-50 border-2 border-white rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-800 peer-checked:border-blue-600 hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-700"
            >
                <div className="flex items-center justify-center space-x-2">
                    <Image
                        src={coin.logo}
                        alt={coin.name}
                        width={24}
                        height={24}
                        className='rounded-full'
                    />

                    <div>
                        <p className="text-sm font-medium text-gray-900 truncate dark:text-white capitalize">
                            {coin.symbol}
                        </p>
                    </div>
                </div>

                <div className="text-right">
                    <p className="text-sm font-medium text-gray-900 truncate dark:text-white capitalize">
                        ${millify(coin.usdValue)}
                    </p>
                    <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                        {millify((coin.usdValue / summary.tokensValueUSD) * 100) }%
                    </p>
                </div>
            </label>
        </>
    )

    // Filtering tokens by coin
    function handleChange(symbol: string, event: ChangeEvent<HTMLInputElement>) {
        const isChecked = event.target.checked;
        setCoins((prevCoins) => {
            return {
                ...prevCoins,
                [symbol]: {
                    ...prevCoins[symbol],
                    isChecked: isChecked
                }
            };
        });
    }

}