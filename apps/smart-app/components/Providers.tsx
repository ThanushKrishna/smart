'use client'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

import React from 'react'


const graphqlurl = process.env.NEXT_PUBLIC_API_LINK



const Providers = ({ children } : { children: React.ReactNode}) => {
  
    const client = new ApolloClient({
        uri: graphqlurl,
        cache: new InMemoryCache(),
      })

  return (

    <ApolloProvider client={client}>
        {children}
    </ApolloProvider>
    
  )
}

export default Providers

