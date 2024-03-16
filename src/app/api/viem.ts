import { createPublicClient, http } from "viem";
import { arbitrum, mainnet } from "viem/chains";

export const ethereumClient = createPublicClient({
  chain: mainnet,
  transport: http(),
});

export const arbitrumClient = createPublicClient({
  chain: arbitrum,
  transport: http(),
});

