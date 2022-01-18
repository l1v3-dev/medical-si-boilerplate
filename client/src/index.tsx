import React from "react";
import ReactDOM from "react-dom";
import { IntlProvider } from "react-intl";
import messages from "./locales";
import "./index.css";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import config from "./config";
import Routes from "./Routes";
import { ELanguageLocale } from "./constants/common";

const client = new ApolloClient({
  uri: config.apiUrl,
  cache: new InMemoryCache(),
});
const currentLocale = ELanguageLocale.FRENCH

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <IntlProvider locale={currentLocale}
        messages={(messages as any)[currentLocale]}>
        <Routes />
      </IntlProvider>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
