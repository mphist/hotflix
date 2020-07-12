import React from "react";
import { ApolloProvider } from "@apollo/react-hooks";
import client from "./ui/Common/Card";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import App from "./App";
import Header from "./ui/Common/Header/Header";
import { Home, TV, Movies, Latest, Login } from "./ui";

const Root = () => {
  return (
    <div>
      <ApolloProvider client={client}>
        <Router>
          <Switch>
            <Route path="/browse">
              <Header />
              <Home />
            </Route>
            <Route path="/tv">
              <Header />
              <TV />
            </Route>
            <Route path="/movies">
              <Header />
              <Movies />
            </Route>
            <Route path="/latest">
              <Header />
              <Latest />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route exact path="/">
              <App />
            </Route>
          </Switch>
        </Router>
      </ApolloProvider>
    </div>
  );
};

export default Root;
