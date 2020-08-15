import React, { useState, useEffect, useContext } from "react";
import { Route, RouteProps, Redirect, useHistory } from "react-router-dom";
import axios from "axios";
import { Login, Home } from "../..";
import Header from "../Header/Header";
import { AuthContext } from "../Context/auth";

interface PrivateRouteProps extends RouteProps {}

export const PrivateRoute = ({ children, ...rest }: PrivateRouteProps) => {
  const { email } = useContext(AuthContext);
  console.log("context is", email);
  const history = useHistory();
  const user = sessionStorage.getItem("user");

  if (email || user) {
    if (
      rest.path === "/login" ||
      rest.path === "/" ||
      rest.path === "/register"
    ) {
      history.push("/browse");
      return (
        <Route>
          <Header />
          <Home />
        </Route>
      );
    } else {
      //history.push(rest.path as string);
      return <Route>{children}</Route>;
    }
  } else {
    if (rest.path === "/") {
      return <Route>{children}</Route>;
    }
    if (rest.path === "/register") {
      return <Route>{children}</Route>;
    }
    if (rest.path !== "/login") {
      history.push("/login");
      return (
        <Route>
          <Login />
        </Route>
      );
    }
    return (
      <Route>
        <Login />
      </Route>
    );
  }

  /*  const [isLoggedin, setLoggedin] = useState(false);
  const checkAuth = () => {
    const host = "http://localhost:4000";
    axios
      .get(host, { withCredentials: true })
      .then((res) => {
        setLoggedin(res.data.login);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    checkAuth();
  }, [isLoggedin]);

  if (isLoggedin) {
    if (rest.path === "/login") {
      window.history.replaceState({}, "null", "/browse");
      return (
        <Route>
          <Header />
          <Home />
        </Route>
      );
    } else {
      window.history.replaceState({}, "null", rest.path as string);
      return <Route>{children}</Route>;
    }
  } else {
    window.history.replaceState({}, "null", "/login");
    return (
      <Route>
        <Login />
      </Route>
    );
  } */
};
