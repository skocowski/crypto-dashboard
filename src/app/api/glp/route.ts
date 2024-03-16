import { stakedGLP } from "@/abi/stakedGLP";
import { arbitrumClient } from "../viem";
import { Address } from "viem";
import { GlpRewardTracker } from "@/abi/GlpRewardTracker";
import { GlpToken } from "@/utils/interfaces";
import { glpManagerABI } from "@/abi/glpManagerAbi";

export async function GET(request: Request) {
    try {
      const params = new URLSearchParams(request.url.split("?")[1]);
      const address = params.get("address");

      const stakedGlpContractAddress =
        "0x5402B5F40310bDED796c7D0F3FF6683f5C0cFfdf";
      const glpRewardReaderContractAddress =
        "0x4e971a87900b931fF39d1Aad67697F49835400b6";
      // Ensure address parameter is provided
      if (!address) {
        return new Response("No address provided", { status: 400 });
      }
        
            const fetchedPrice = await arbitrumClient.readContract({
              address: "0x3963FfC9dff443c2A94f21b129D429891E32ec18",
              abi: glpManagerABI,
              functionName: "getPrice",
              args: [true],
            });

            const glpPrice = Number(fetchedPrice) / Math.pow(10, 30);

      const balanceInWei = await arbitrumClient.readContract({
        address: stakedGlpContractAddress,
        abi: stakedGLP,
        functionName: "balanceOf",
        args: [address as Address],
      });

      const decimals = await arbitrumClient.readContract({
        address: stakedGlpContractAddress,
        abi: stakedGLP,
        functionName: "decimals",
      });

      const claimable = await arbitrumClient.readContract({
        address: glpRewardReaderContractAddress,
        abi: GlpRewardTracker,
        functionName: "claimable",
        args: [address as Address],
      });
      const tempObject: GlpToken = {
        walletAddress: address,
        balance: Number(balanceInWei) / Math.pow(10, decimals),
        rewards: Number(claimable) / Math.pow(10, decimals),
        chain: "arbitrum", // for easier filtering,
        usdValue: Number(balanceInWei) / Math.pow(10, decimals) * glpPrice
      };

      // Convert response object to JSON string
      const responseBody = JSON.stringify(tempObject);

      // Return response with JSON content type
      return new Response(responseBody, {
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
    return new Response("Error occurred", { status: 500 });
  }
}

