import React from "react";
import RegisterView from "../ui/RegisterView";
import RegisterController from "../controller/RegisterController";

const RegisterConnector = () => {
  return (
    <RegisterController>
      {({ submit }) => <RegisterView submit={submit} />}
    </RegisterController>
  );
};

export default RegisterConnector;
