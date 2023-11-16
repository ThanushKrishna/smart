'use client'
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';

import React from 'react'

const graphqlhost="localhost"

const Providers = ({ children } : { children: React.ReactNode}) => {
  
    const client = new ApolloClient({
        uri: `http://${graphqlhost}:3000/api/graphql/`,
        cache: new InMemoryCache(),
      });

      console.log(`http://${graphqlhost}:3000/api/graphql/`);

  return (

    <ApolloProvider client={client}>
        {children}
    </ApolloProvider>
    
  )
}

export default Providers