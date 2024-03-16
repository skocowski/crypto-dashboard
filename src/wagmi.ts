import { createClient } from 'viem';
import { http, createConfig } from 'wagmi'
import { mainnet, sepolia, arbitrum } from 'wagmi/chains'
import { injected } from 'wagmi/connectors'






 export const config = createConfig({
  chains: [mainnet, sepolia, arbitrum],
  connectors: [injected()],
  ssr: true,
  client({ chain }) {
    return createClient({ chain, transport: http() });
  },
});

declare module 'wagmi' {
  interface Register {
    config: typeof config
  }
} 
