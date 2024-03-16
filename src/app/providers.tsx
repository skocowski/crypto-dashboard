'use client'

import { type ReactNode } from 'react'
import { WagmiProvider } from 'wagmi'
import { config } from '@/wagmi'
import { AssetsProvider } from './AssetsContext'

export function Providers(props: { children: ReactNode }) {

  return (
  <AssetsProvider>
    <WagmiProvider config={config}>
    
        {props.children}
  
    </WagmiProvider>
    </AssetsProvider>
  )
}
