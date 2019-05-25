import React from 'react';
import './App.css';
import { Booklist } from './Booklist';
import { ApolloClient, gql } from 'apollo-boost'
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';

const cache = new InMemoryCache();
const link = new HttpLink({
  uri: 'http://localhost:4000/graphql'
})
const client = new ApolloClient({
  cache,
  link
})

client.query({
  query: gql`
    {
      products {
        _id
        name
      }
    }
  `
}).then(res => console.log(res))

function App() {
  return (
    <div className="App">
      <Booklist />
    </div>
  );
}

export default App;
