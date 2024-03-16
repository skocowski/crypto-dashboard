import { BASE_URL, alchemyNetworks, networksList } from "@/utils/Constants";
import { Token, TokenPriceInt } from "@/utils/interfaces";
import {
  Alchemy,
  TokenBalance,
  TokenBalancesResponse,
} from "alchemy-sdk";
import { tokensData } from "../TokensData";


// Define GET function
export async function GET(request: Request) {
  try {
    const params = new URLSearchParams(request.url.split("?")[1]);
    const address = params.get("address");
    // Ensure address parameter is provided
    if (!address) {
      return new Response("No address provided", { status: 400 });
    }
    let tokens: Token[] = [];

    const prices = await getTokenPrices();

    for (let i = 0; i < alchemyNetworks.length; i++) {
      let tempTokens: Token[] = [];
      let basicTokens: TokenBalance[] = [];
      const alchemy = new Alchemy({
        apiKey: process.env.ALCHEMY_ETH_API_KEY,
        network: alchemyNetworks[i],
      });

      // Fetch token balances for the address
      const response: TokenBalancesResponse =
        await alchemy.core.getTokenBalances(address);

      if (response && response.tokenBalances) {
        basicTokens = response.tokenBalances.filter((token: TokenBalance) => {
          return (
            token.tokenBalance !== null &&
            token.tokenBalance !== undefined &&
            parseInt(token.tokenBalance) > 0
          );
        });

        // Iterate through token balances and update properties
        for (let token of basicTokens) {
          // Retrieve metadata for the token
          const metadata = await alchemy.core.getTokenMetadata(
            token.contractAddress
          );

          const getLogo = () => {
            if (metadata.logo) { return metadata.logo } 
            const sym = metadata.symbol?.toLowerCase() ?? ""
            const logo = tokensData.find(token => token.symbol.toLowerCase() === sym)
            if (logo) {
              return logo.image
            }
            return ""
            
          };
          


          const price =
            prices &&
            metadata.symbol &&
            prices[metadata.symbol.toLowerCase()] !== undefined
              ? prices[metadata.symbol.toLowerCase()]
              : 0;

          const balanceInWei = parseInt(token.tokenBalance ?? "0");
          const bal = balanceInWei / Math.pow(10, metadata.decimals ?? 0);

          const newToken: Token = {
            contractAddress: token.contractAddress,
            symbol: metadata.symbol ?? "",
            name: metadata.name ?? "",
            logo: getLogo(),
            decimals: metadata.decimals ?? 0,
            usdValue: bal * price,
            balance: bal,
            walletAddress: address,
            chain: networksList[i],
            price: price
          };

          tempTokens.push(newToken);
        }
        tempTokens = tempTokens.filter((token: Token) => {
          return token.usdValue > 10; // display only tokens worth more than 10usd
        });
        if (tempTokens.length > 0) {
          tokens = tokens.concat(tempTokens);
        }
      }
    }

    // Convert response object to JSON string
    const responseBody = JSON.stringify(tokens);

    // Return response with JSON content type
    return new Response(responseBody, {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    // Return error response with status code 500
    return new Response(`Error occurred ${error}`, { status: 500 });
  }
}

 async function getTokenPrices() {
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


