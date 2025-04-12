// lib/apolloClient.ts
import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: '/api/graphql', // Or your GraphQL endpoint
  cache: new InMemoryCache(),
});

export default client;
