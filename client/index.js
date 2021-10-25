import React from "react";
import { render } from "react-dom";
import App from "./App";
import styles from "./stylesheets/style.css";
import {
  ApolloProvider,
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";
import { CookiesProvider } from "react-cookie";

const httpLink = createHttpLink({
  uri: "http://localhost:4000",
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

render(
  <ApolloProvider client={client}>
    <CookiesProvider>
      <App />
    </CookiesProvider>
  </ApolloProvider>,
  document.querySelector("#app")
);
