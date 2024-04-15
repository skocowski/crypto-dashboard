import { Wallet } from "@/utils/interfaces"
import { useAssets } from "../AssetsContext"
import millify from "millify"


const WalletsData = () => {
    const { wallets } = useAssets()
    return (
        <>
            {Object.values(wallets).length > 0 &&
                < div className="w-full">
                    <div className="block w-full p-3 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                        <div className="mb-5 text-lg font-medium text-gray-900 dark:text-white">
                            <div className="flex flex-wrap justify-between">
                                <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
                                    Balances
                                </span>
                                <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400"></span>
                            </div>
                        </div>

                        <ul className="block justify-center space-y-2">
                                        {Object.values(wallets).map((wallet, i) => [
                      <li key={i}>
                          <Card wallet={wallet} />
                      </li>
                  ])} 
                        </ul>
                    </div>
                </div >

            }
        </>

    )
}

export default WalletsData

type CardProps = {
    wallet: Wallet
}

const Card = ({ wallet }: CardProps) => {
const { filteredSummary} = useAssets()
    return (
        <>
            <div className="inline-flex items-center justify-center w-full space-x-2 mb-2">
                {/*        <hr className="w-full h-1 my-2 bg-gray-200 border-0 rounded dark:bg-gray-700"></hr>  */}
                <div className="text-sm font-medium text-gray-900 dark:text-white">
                    {/*     {wallet.walletAddress && wallet.walletAddress.slice(0, 6)} */}...
                    {wallet.walletAddress && wallet.walletAddress.slice(36)}
                </div>

                <hr className="w-full h-1 bg-gray-200 border-0 rounded dark:bg-gray-700"></hr>
                <div className="text-sm font-medium text-gray-900 dark:text-white">
                    {/*                     ${wallet.values.total.toLocaleString(undefined, {
                        maximumFractionDigits: 0,
                    })} */}
                </div>

            </div>

                  { filteredSummary.walletsSummary[wallet.walletAddress]?.tokensValueUSD > 0 && (
                <div className="text-sm text-medium text-gray-500 truncate dark:text-gray-400 pb-1">
                    <div className="flex justify-between">
                        <div>Tokens</div>
                        <div>
                            ${millify(filteredSummary.walletsSummary[wallet.walletAddress].tokensValueUSD)}
                        </div>
                    </div>
                </div>
            )} 

            {filteredSummary.walletsSummary[wallet.walletAddress]?.nativeTokensValueUSD > 0 && (
                <div className="text-sm text-medium text-gray-500 truncate dark:text-gray-400 pb-1">
                    <div className="flex justify-between">
                        <div>Native</div>
                        <div>
                            ${millify(filteredSummary.walletsSummary[wallet.walletAddress].nativeTokensValueUSD)}
                        </div>
                    </div>
                </div>
            )} 

          
      
            {filteredSummary.walletsSummary[wallet.walletAddress]?.glpValueUSD > 0 && (
    


     
                <div className="text-sm text-medium text-gray-500 truncate dark:text-gray-400 pb-1">
                    <div className="flex justify-between">
                        <div>Glp</div>
                        <div>
                            ${millify(filteredSummary.walletsSummary[wallet.walletAddress]?.glpValueUSD)}
                        </div>
                    </div>
                </div>
            )} 




        </>
    )
}