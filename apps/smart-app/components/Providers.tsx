'use client'
import { ApolloClient, InMemoryCache, ApolloProvider,  ApolloLink, Observable, Operation, FetchResult  } from '@apollo/client';
// import { onError } from 'apollo-link-error'
import React from 'react'


const graphqlurl = process.env.NEXT_PUBLIC_API_LINK




const Providers = ({ children } : { children: React.ReactNode}) => {
  
    const client = new ApolloClient({
        uri: graphqlurl,
        cache: new InMemoryCache(),        
        // link: ApolloLink.from([errorLink]),
        
      })

  return (

    <ApolloProvider client={client}>
        {children}
    </ApolloProvider>
    
  )
}

export default Providers

