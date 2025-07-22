import './globals.css'
import type { Metadata } from 'next'
import  Providers  from '../components/Providers'
import NavBar from './NavBar'



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
      
      
      
      <body>
      <Providers>        
          <NavBar/>         
          <main> {children} </main>        
      </Providers>
         
        </body>
    </html>
  )
}
