import { useAssets } from '@/app/AssetsContext'
import { AssetMap, GlpToken } from '@/utils/interfaces'
import React, { useEffect, useState } from 'react'

const Glp = () => {
    const { glpAPR, glpPrice, filteredAssets } = useAssets()
/*     const [glp, setGlp] = useState<GlpToken>({ // Initialize state as an empty object
        walletAddress: '',
        balance: 0,
        rewards: 0,
        chain: ''
    }); */
    const [glp, setGlp] = useState<GlpToken>({ walletAddress: '', balance: 0, rewards: 0, chain: '', usdValue: 0 });


    useEffect(() => {
        mergeTokens(filteredAssets)
    
    }, [filteredAssets])
  return (
      <>
          {(glp.balance > 0 || glp.rewards > 0) && (
              <div>
                  <div>
                      <div className="w-full px-3 mb-3 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                          <div>
                              <div className="flow-root">
                                  <div className="pt-2 pb-3">
                                      <div className="flex items-center space-x-4">
                                          <div className="flex-shrink-0">
                                              <img
                                                  className="w-8 h-8 rounded-full"
                                                  src="assets/gmx.png"
                                                  alt="GMX"
                                              />
                                          </div>
                                          <div className="flex-1 min-w-0">
                                              <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                                  GLP
                                              </p>
                                              <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                                  Arbitrum
                                              </p>
                                          </div>

                                          <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                              APR: {glpAPR}
                                          </div>
                                      </div>
                                  </div>
                              </div>
                          </div>

                          <div className="dark:bg-gray-700 bg-gray-50 rounded-lg p-1 mb-3 w-full">
                              <div className="grid grid-cols-4 p-2 justify-between">
                                  <div className="text-left flex flex-wrap items-center justify-between">
                                      <div className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                          Balance:
                                      </div>
                                      <div className="text-sm font-semibold">
                                          BALANCE
                                      </div>
                                  </div>

                                  <div className="text-right">
                                      <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                          Price
                                      </p>
                                  </div>

                                  <div className="text-right">
                                      <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                          Reward:
                                      </p>
                                  </div>
                                  <div className="text-right">
                                      <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                          USD Value
                                      </p>
                                  </div>
                              </div>

                              <div className="grid grid-cols-4 p-2 justify-between">
                                  <div className="text-left text-sm text-gray-500 truncate dark:text-gray-400">
                                      <div className="grid grid-cols-2 invisible sm:visible">
                                          <div>
                                              <p>WBTC</p>
                                              <p>WETH</p>
                                              <p>USDC.e</p>
                                              <p>Other</p>
                                          </div>

                                          <div className="font-medium text-right">
                                              <p>
                                                  {(glp.balance * 0.25).toLocaleString(undefined, {
                                                      maximumFractionDigits: 0,
                                                  })}
                                              </p>
                                              <p>
                                                  {(glp.balance * 0.3).toLocaleString(undefined, {
                                                      maximumFractionDigits: 0,
                                                  })}
                                              </p>
                                              <p>
                                                  {(glp.balance * 0.33).toLocaleString(undefined, {
                                                      maximumFractionDigits: 0,
                                                  })}
                                              </p>
                                              <p>
                                                  {(glp.balance * 0.09).toLocaleString(undefined, {
                                                      maximumFractionDigits: 0,
                                                  })}
                                              </p>
                                          </div>
                                      </div>
                                  </div>

                                  <div className="text-right text-sm text-gray-500 truncate dark:text-gray-400">
                                      ${" "}
                                      {!isNaN(glpPrice) &&
                                          glpPrice.toLocaleString(undefined, {
                                              maximumFractionDigits: 3,
                                          })}
                                  </div>
                                  <div className="text-right text-sm text-gray-500 truncate dark:text-gray-400">
                                      <div>
                                          ETH{" "}
                                          {glp.rewards.toLocaleString(undefined, {
                                              maximumFractionDigits: 4,
                                          })}
                                      </div>
                                      <div>
                                          ${" "}
                                          {(glp.balance * glpPrice).toLocaleString(undefined, {
                                              maximumFractionDigits: 2,
                                          })}
                                      </div>
                                  </div>
                                  <div className="text-right text-sm text-gray-500 truncate dark:text-gray-400">
                                      ${" "}
                                      {(glp.rewards * glpPrice).toLocaleString(undefined, {
                                          maximumFractionDigits: 0,
                                      })}
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          )}
      
      </>
  )
    function mergeTokens(assets: AssetMap) {
        const mergedToken: GlpToken = {
            walletAddress: '', 
            balance: 0,
            rewards: 0,
            chain: '', 
            usdValue: 0
        };

        Object.values(assets).forEach(asset => {
            mergedToken.balance += asset.glp?.balance ?? 0
            mergedToken.rewards += asset.glp?.rewards ?? 0
            mergedToken.usdValue += asset.glp?.usdValue ?? 0
        
        });

        setGlp(mergedToken);
    }
}

export default Glp 

