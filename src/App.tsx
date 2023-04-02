import { ApolloProvider } from "@apollo/react-hooks";
import { Provider as StyletronProvider } from "styletron-react";
import { Client as Styletron } from "styletron-engine-atomic";
import { BaseProvider } from "baseui";
import { theme } from "./theme";
import RootRoutes from "./navigation/RootRoutes";
import AuthProvider from "./modules/shared/context/auth";
import ApolloClient from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { ApolloLink, concat } from "apollo-link";
import { InMemoryCache } from "apollo-cache-inmemory";

const httpLink = new HttpLink({ uri: "http://localhost:3001/graphql" });

const authMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  const token = localStorage.getItem("authorization");

  operation.setContext({
    headers: {
      authorization: token ? token : "",
    },
  });
  return forward(operation);
});

export const apolloClient = new ApolloClient({
  link: concat(authMiddleware, httpLink),
  cache: new InMemoryCache(),
});

function App() {
  const engine = new Styletron();
  return (
    <ApolloProvider client={apolloClient as any}>
      <StyletronProvider value={engine}>
        <BaseProvider theme={theme}>
          <AuthProvider>
            <RootRoutes />
          </AuthProvider>
        </BaseProvider>
      </StyletronProvider>
    </ApolloProvider>
  );
}

export default App;
