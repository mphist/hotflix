import React, { useReducer } from "react";
import { ApolloProvider } from "@apollo/react-hooks";
import client from "./ui/Common/Card";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import App from "./App";
import Header from "./ui/Common/Header/Header";
import { Home, TV, Movies, Latest, Login } from "./ui";
import Register from "./ui/Register";
import { PrivateRoute } from "./ui/Common/PrivateRoute";
import { AuthContext } from "./ui/Common/Context/auth";
import MyList from "./ui/MyList";
import { reducer, initialState } from "./context";

const Root = () => {
  const [{ email }, dispatch] = useReducer(reducer, initialState);
  return (
    <div>
      <ApolloProvider client={client}>
        <AuthContext.Provider value={{ email, dispatch }}>
          <Router>
            <Switch>
              <PrivateRoute exact path="/browse">
                <Header />
                <Home />
              </PrivateRoute>
              <PrivateRoute exact path="/tv">
                <Header />
                <TV />
              </PrivateRoute>
              <PrivateRoute exact path="/movies">
                <Header />
                <Movies />
              </PrivateRoute>
              <PrivateRoute exact path="/latest">
                <Header />
                <Latest />
              </PrivateRoute>
              <PrivateRoute exact path="/register">
                <Register />
              </PrivateRoute>
              <PrivateRoute exact path="/login">
                <Login />
              </PrivateRoute>
              <PrivateRoute exact path="/mylist">
                <Header mylist={true} />
                <MyList />
              </PrivateRoute>
              <PrivateRoute exact path="/">
                <App />
              </PrivateRoute>
              <Route path="/" render={() => <div>404</div>} />
            </Switch>
          </Router>
        </AuthContext.Provider>
      </ApolloProvider>
    </div>
  );
};

export default Root;
