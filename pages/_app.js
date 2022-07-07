import "../styles/globals.css";
import { Link } from "@mui/material";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:3001/graphql",
  cache: new InMemoryCache(),
});

function MyApp({ Component, pageProps }) {
  console.log(Component, pageProps, "gfdgdf");
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />;
    </ApolloProvider>
  );
}
export default MyApp;
