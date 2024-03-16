'use client'
import { TextInput } from 'flowbite-react'
import React, {  useRef, useState } from 'react'
import { useAssets } from '../AssetsContext'
import { fetchGlp, fetchNativeTokens, fetchTokens, isValidEthereumAddress } from '@/utils/Functions'
import { Asset } from '@/utils/interfaces'

import { SpinningWheel, WalletIcon } from '@/utils/Icons'


const AddWallet = () => {

    const { wallets, setWallets, setAssets, addingWallet, setAddingWallet, fetching } = useAssets()
    const [errorMessage, setErrorMessage] = useState("");
    const [inputColor, setInputColor] = useState("gray");
    const inputRef = useRef<HTMLInputElement>(null);

    return (
        <>
            <div className="flex items-center space-x-3">
                <form className="w-96 min-w-fit" onSubmit={handleSubmit}>
                    <TextInput
                        placeholder='Wallet address'
                        disabled={addingWallet || fetching}
                        required
                        shadow
                        helperText={errorMessage}
                        color={inputColor}
                        icon={WalletIcon}
                        rightIcon={addingWallet ? SpinningWheel : undefined}
                        ref={inputRef}
                        onClick={() => {
                            setErrorMessage("");
                            setInputColor("gray");
                        }}
                    />
                </form>
            </div>
        </>
    );

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setAddingWallet(true)
        const newWallet = inputRef.current?.value ?? "";
        const trimmedAddress = newWallet.replace(/\s+/g, "");
        const isDuplicateWallet = trimmedAddress in wallets;


        if (isValidEthereumAddress(trimmedAddress) && !isDuplicateWallet) {
            const updatedWallets = { ...wallets, [trimmedAddress]: { walletAddress: trimmedAddress, isChecked: true } };
            const newTokens = await fetchTokens(trimmedAddress);
            const newNativeTokens = await fetchNativeTokens(trimmedAddress)
            const newGlpTokens = await fetchGlp(trimmedAddress)
            const newAssets: Asset = {
                tokens: newTokens,
                native: newNativeTokens,
                glp: newGlpTokens
            }

            setAssets(prevAssets => ({
                ...prevAssets,
                [trimmedAddress]: newAssets
            }));


            setWallets(updatedWallets);
            setAddingWallet(false)

            // Clear the input field
            if (inputRef.current) {
                inputRef.current.value = '';
            }
        } else {
            setErrorMessage("Address is invalid")
        }

    };

}

export default AddWallet




