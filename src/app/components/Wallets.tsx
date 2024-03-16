import React, { ChangeEvent } from 'react'
import { useAssets } from '../AssetsContext'
import { Wallet } from '@/utils/interfaces'
import { CopyIcon, DeleteIcon } from '@/utils/Icons'

const Wallets = () => {
    const { wallets } = useAssets()
    return (
        <div className="w-full">
            <div className="block w-full p-3 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <div className="mb-5 text-lg font-medium text-gray-900 dark:text-white">
                    <div className="flex flex-wrap justify-between">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
                            Wallets
                        </span>

                    </div>
                </div>

                {/* Cards list */}

                <ul className="block justify-center space-y-2">
                    {Object.keys(wallets).map((walletKey, i) => (
                        <div key={i}>
                            <Card wallet={wallets[walletKey]} />
                        </div>
                    ))}

                </ul>
            </div>
        </div>
    )
}

export default Wallets

type CardProps = {
    wallet: Wallet
}

const Card = ({ wallet }: CardProps) => {
    const { setWallets, wallets } = useAssets()
    return (
        <>
            <div className="flex items-center justify-between">

                <div className="flex items-center">
                    <input
                        id={wallet.walletAddress}
                        type="checkbox"
                        checked={wallet.isChecked}
                        onChange={(e) => handleChange(e, wallet.walletAddress)}
                        value=""
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label
                        htmlFor={wallet.walletAddress}
                        className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                        <div className="flex flex-wrap">
                            <div className="text-sm font-medium">
                                {wallet.walletAddress && wallet.walletAddress.slice(0, 4)}...
                                {wallet.walletAddress && wallet.walletAddress.slice(36)}
                            </div>

                        </div>
                    </label>
                    <div
                        onClick={() => { navigator.clipboard.writeText(wallet.walletAddress) }}
                        className="cursor-pointer"
                    >
                        <CopyIcon />
                    </div>
                </div>

                <div
                    onClick={() => handleDelete(wallet.walletAddress)}
                    className="cursor-pointer"
                >
                    <DeleteIcon />
                </div>
            </div>
        </>
    );

    function handleDelete(currentWallet: string) {
        const walletAddressToRemove = currentWallet; // Specify the wallet address to remove
        const updatedWallets = { ...wallets };
        delete updatedWallets[walletAddressToRemove];
        setWallets(updatedWallets);
    }

    function handleChange(e: ChangeEvent<HTMLInputElement>, walletAddress: string) {
        setWallets((prevWallets) => {
            const updatedWallets = { ...prevWallets }; // Create a copy of the previous state

            // Update the isChecked value of the wallet with the specified address
            updatedWallets[walletAddress] = {
                ...updatedWallets[walletAddress], // Preserve other properties of the wallet
                isChecked: e.target.checked // Update isChecked property using the checkbox's checked state
            };

            return updatedWallets; // Return the updated state
        });
    }
}


