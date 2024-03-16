import React, { ChangeEvent } from 'react'
import { useAssets } from '../AssetsContext'
import { Network } from '@/utils/interfaces'
import Image from 'next/image'
import millify from 'millify'

const Networks = () => {
    const { networks } = useAssets()
    return (
        <div className="w-full">
            <div className="flex flex-wrap justify-end gap-2">
                {Object.keys(networks).map((networkKey, i) => (
                    <div key={i}>
                        <Card
                            network={networks[networkKey]}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Networks

type CardProps = {
    network: Network
}

const Card = ({ network }: CardProps) => {
    const { setNetworks, summary } = useAssets()
    return (
        <div className="w-32">
            <input
                type="checkbox"
                id={network.name}
                value=""
                checked={network.isChecked}
                onChange={(event) => handleChange(network.name, event)}
                className="hidden peer w-32"
            />
            <label
                htmlFor={network.name}
                className="flex items-center justify-between px-1 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-blue-600 hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:bg-gray-700 dark:hover:bg-gray-700"
            >
                <div className="flex justify-between">
                    <div>
                        {
                            <Image
                                src={network.image}
                                alt={network.name}
                                width={24}
                                height={24}
                            />
                        }
                    </div>
                </div>
                <div className="">
                    <p className="text-sm font-medium text-gray-900 truncate dark:text-white capitalize">
                        {network.name}
                    </p>
                    <p className="text-sm text-right text-gray-500 truncate dark:text-gray-400">
                        $ {millify(summary.chainsValueUSD[network.name] ?? 0)}
                    </p>
                </div>
            </label>
        </div>
    );

    function handleChange(name: string, event: ChangeEvent<HTMLInputElement>) {
        const isChecked = event.target.checked;
        setNetworks((prevNetworks) => {
            return {
                ...prevNetworks,
                [name]: {
                    ...prevNetworks[name],
                    isChecked: isChecked
                }
            };
        });
    }
}

