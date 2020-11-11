import { ApolloClient, HttpLink, InMemoryCache, InMemoryCacheConfig} from '@apollo/client';
import fetch from 'cross-fetch';

const client = new ApolloClient({
  connectToDevTools: true,
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: 'http://localhost:4000/',
    fetch,
  })
});

export default client;