import { fetchNativeTokens, fetchTokens } from '@/utils/Functions'
import { Asset, AssetMap, WalletMap } from '@/utils/interfaces'
import React from 'react'
import { useAssets } from '../AssetsContext'
import { Button } from 'flowbite-react'

const ReloadWallets = () => {
    const {wallets, setAssets, fetching, setFetching, addingWallet} = useAssets()
  return (
      <>
          <Button
              size="sm"
              gradientMonochrome="cyan"
              disabled={fetching || addingWallet}
              isProcessing={fetching}
              onClick={() => reloadWallets(wallets)}
          >
              Refetch
      </Button>
      </>
  )
    
    async function reloadWallets(wallets: WalletMap) {
        setFetching(true);
        let newAssets: AssetMap = {};
        for (let wallet of Object.values(wallets)) {


            const newTokens = await fetchTokens(wallet.walletAddress);
            const newNativeTokens = await fetchNativeTokens(wallet.walletAddress)
            const newAsset: Asset = {
                tokens: newTokens,
                native: newNativeTokens
            }
            // Add newAsset to newAssets
            newAssets[wallet.walletAddress] = newAsset;
        }
        setAssets(newAssets);
        setFetching(false)
    
    }

}

export default ReloadWallets



