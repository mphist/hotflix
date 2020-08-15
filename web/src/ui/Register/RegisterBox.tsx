import React from "react";
import "./RegisterBox.scss";
import RegisterConnector from "../Common/form-formik/src/modules/register/connector/RegisterConnector";

const RegisterBox = () => {
  return (
    <div className="register-box">
      <div className="register-header">
        <h2 className="register-text">Sign Up</h2>
      </div>
      <div className="register-form">
        <RegisterConnector />
      </div>
    </div>
  );
};

export default RegisterBox;
