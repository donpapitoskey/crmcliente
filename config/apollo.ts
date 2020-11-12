import {
  ApolloClient,
  HttpLink,
  ApolloLink,
  InMemoryCache,
  concat,
} from '@apollo/client';
import fetch from 'cross-fetch';

const httpLink = new HttpLink({
  uri: 'http://localhost:4000/',
  fetch,
});

const authMiddleware = new ApolloLink((operation, forward) => {
  try {
    const token = localStorage.getItem('token');
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : '',
      },
    });
    return forward(operation);
  } catch (error) {
    console.log(error);
  }
});

const client = new ApolloClient({
  connectToDevTools: true,
  cache: new InMemoryCache(),
  link: concat(authMiddleware, httpLink),
});

export default client;
