import React from "react";
import LoginController from "../controller/LoginController";
import LoginView from "../ui/LoginView";

const LoginConnector = () => {
  return (
    <LoginController>
      {
        //@ts-ignore
        ({ submit }) => <LoginView submit={submit} />
      }
    </LoginController>
  );
};

export default LoginConnector;
