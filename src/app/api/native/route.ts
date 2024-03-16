import { BASE_URL, alchemyNetworks, networksList } from "@/utils/Constants";
import { NativeToken, TokenPriceInt } from "@/utils/interfaces";
import { Alchemy, Utils } from "alchemy-sdk";



export async function GET(request: Request) {
    try {
      const params = new URLSearchParams(request.url.split("?")[1]);
      const address = params.get("address");

      if (!address) {
        return new Response("No address provided", { status: 400 });
      }
      const prices = await getTokenPrices()
      let result: NativeToken[] = [];

      for (let i = 0; i < alchemyNetworks.length; i++) {
        const alchemy = new Alchemy({
          apiKey: process.env.ALCHEMY_ETH_API_KEY,
          network: alchemyNetworks[i],
        });

        const response = await alchemy.core.getBalance(address, "latest");
        let balance = Number(Utils.formatEther(response))
        
        const price = prices ? (networksList[i] !== "polygon" ? prices["eth"] :  prices["matic"]) : 0


            
          
          const newBalance = {
              chain: networksList[i],
              balance: balance,
            walletAddress: address,
            usdValue: balance * price
          }

        if (balance) {
          result = result.concat(newBalance);
        }
      }

      // Convert response object to JSON string
      const responseBody = JSON.stringify(result);

      // Return response with JSON content type
      return new Response(responseBody, {
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      // Return error response with status code 500
      return new Response(`Error occurred ${error}`, { status: 500 });
    }
}

export async function getTokenPrices() {
  try {
    const response = await fetch(`${BASE_URL}/api/prices`);
    const data = await response.json();

    const prices: Record<string, number> = data.reduce(
      (
        acc: Record<string, number>,
        { symbol, current_price }: TokenPriceInt
      ) => {
        acc[symbol] = current_price;
        return acc;
      },
      {}
    );

    return prices;
  } catch (error) {
    console.error("Error fetching token prices:", error);
    return null;
  }
}

const nativePrices = ["eth"]