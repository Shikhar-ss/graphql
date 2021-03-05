import './App.css';
import { ApolloClient, ApolloProvider } from '@apollo/client'
import Booklist from "./components/BookList"

// Apollo client setup
const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql'
})

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        THE READING LIST!!!
      <Booklist />
      </div>
    </ApolloProvider>
  );
}

export default App;
