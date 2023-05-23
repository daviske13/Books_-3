// apollo-client.js

import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://your-apollo-server/graphql', // Replace with your actual GraphQL server endpoint
    cache: new InMemoryCache(),
});

export default client;
