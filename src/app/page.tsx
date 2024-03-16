'use client'

import Header from "./components/Header"
import TokensTable from "./components/TokensTable"
import Coins from "./components/Coins";
import Wallets from "./components/Wallets";
import NativeTokens from "./components/NativeTokens";

import Charts from "./components/Charts";
import { useAssets } from "./AssetsContext";
import NoWallets from "./components/NoWallets";
import WalletsData from "./components/WalletsData";
import Glp from "./components/pools/Glp";


function App() {
const {wallets} = useAssets()
  return (
    <>

      <div className="w-full bg-white dark:bg-gray-900 min-h-screen">
        <div className="max-w-7xl container mx-auto content-center">
          <div className=" text-white bg-white dark:bg-gray-900 p-4 w-full items-center">
            <Header />
            <div className="grid grid-cols-1 md:grid-cols-12 gap-5 justify-center">
              <div className="md:col-span-3 space-y-5">
                <Wallets />
                <NativeTokens />
                <Coins />
                <WalletsData />
              </div>
              <div className="md:col-span-9 space-y-5">
                {Object.keys(wallets).length > 0 ?
                  <>
                    <Charts />
                    <TokensTable />
                    <Glp /> 
      </>
                  :
                  <NoWallets />
              
              }
              </div>    
            </div>
          </div>
        </div>
      </div>

    </>
  )
}

export default App
