import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

const uri = process.env.PROD_GRAPHQL_URL || 'http://localhost:3000/graphql';

const httpLink = createHttpLink({
  uri,
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

export default client;
