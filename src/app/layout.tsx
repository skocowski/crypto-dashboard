import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { type ReactNode } from 'react'
import { Providers } from './providers'
import { ThemeModeScript } from 'flowbite-react'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Crypto dashboard',
  description: 'Crypto dashboard',
}

export default function RootLayout(props: { children: ReactNode }) {

  return (
    <html lang="en" suppressHydrationWarning={true}>  
      <head>
        <ThemeModeScript />
      </head>
      <body className={inter.className}>
        <Providers>
            {props.children}
        </Providers>
      </body>
    </html>
  )
}
