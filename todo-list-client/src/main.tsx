// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ApolloClient, HttpLink, InMemoryCache, gql } from "@apollo/client";
import { ApolloProvider } from '@apollo/client/react';

const client = new ApolloClient ({
  link: new HttpLink({ uri: "http://localhost:5038/graphql" }),
  cache: new InMemoryCache(),
});

/*
client
  .query({
    query: gql`
      query GetUsers {
        getUsers {
          id
          age
          name
          isMarried
        }
      }
    `,
}).then((result) => console.log(result));
*/

createRoot(document.getElementById('root')!).render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
)
