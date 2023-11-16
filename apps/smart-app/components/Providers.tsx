'use client'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

import React from 'react'

const graphqlurl = "http://localhost:3000/api/graphql/";

const Providers = ({ children } : { children: React.ReactNode}) => {
  
    const client = new ApolloClient({
        uri: graphqlurl,
        cache: new InMemoryCache(),
      });

      console.log(graphqlurl);

  return (

    <ApolloProvider client={client}>
        {children}
    </ApolloProvider>
    
  )
}

export default Providers

