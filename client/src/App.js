import React from 'react';
import './App.css';
import { Booklist } from './Booklist';
import { ApolloClient } from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
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

// client.query({
//   query: gql`
//     {
//       products {
//         _id
//         name
//       }
//     }
//   `
// }).then(res => console.log(res))

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <Booklist />
      </div>
    </ApolloProvider>
  );
}

export default App;
