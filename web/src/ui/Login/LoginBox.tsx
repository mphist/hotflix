import React from "react";
import LoginConnector from "../Common/form-formik/src/modules/login/connector/LoginConnector";
import "./LoginBox.scss";

const LoginBox = () => {
  return (
    <div className="login-box">
      <div className="login-header">
        <h2 className="login-text">Sign In</h2>
      </div>
      <div className="login-form">
        <LoginConnector />
      </div>
    </div>
  );
};

export default LoginBox;
