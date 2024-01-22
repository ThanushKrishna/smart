import '@radix-ui/themes/styles.css';
import './theme-config.css';
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import  Providers  from '../components/Providers'
import NavBar from './NavBar'
import { Theme } from '@radix-ui/themes';


const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'Smart Leads',
  description: 'Created by Thanush Krishna',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      
      
      
      <body className={inter.variable}>
      <Providers>
        <Theme>
          <NavBar/>         
          <main> {children} </main>
         </Theme>
      </Providers>
         
        </body>
    </html>
  )
}
