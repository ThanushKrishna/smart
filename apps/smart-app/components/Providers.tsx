"use client"
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import React from 'react';
import { getToken } from '../utils/auth';

const graphqlurl = process.env.NEXT_PUBLIC_API_LINK;

const Providers = ({ children }: { children: React.ReactNode }) => {
  const httpLink = createHttpLink({
    uri: graphqlurl,
  });

  // Middleware to set the authentication token in the request headers
  const authLink = setContext((_:any, { headers }) => {
    // Get the authentication token from the server-side request headers
    const authToken = getToken() || // Get the token from client-side cookies if available
      (typeof window === 'undefined' ? // Check if running on the server
        _.req.headers.authorization : // Get the token from server-side request headers
        '');

    return {
      headers: {
        ...headers,
        authorization: authToken ? `Bearer ${authToken}` : '',
      },
    };
  });

  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={client}>
      {children}
    </ApolloProvider>
  );
};

export default Providers;