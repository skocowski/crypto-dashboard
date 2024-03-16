import { DarkThemeToggle } from "flowbite-react"
import { useAssets } from "../AssetsContext"
import millify from "millify"
import AddWallet from "./AddWallet"
import ReloadWallets from "./ReloadWallets"


const Header = () => {
   const {filteredSummary } = useAssets()
  return (
      <>
          <div className="flex flex-wrap md:justify-between items-center mb-5 justify-center">
              <div className="flex justify-start space-x-5">
                  <AddWallet />
                  <ReloadWallets />
              </div>
    
              <div className="flex items-center space-x-3">
                  <DarkThemeToggle />
                  <div className="text-3xl text-white font-semibold">
                      <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
                          $ {millify(filteredSummary.all)}
                      </span>
                  </div>
              </div>
          </div>
      </>
  )
}

export default Header

