import React from "react";
import Header from "../Intro/Header/Header";
import Background from "../Intro/Background/Background";
import RegisterBox from "./RegisterBox";
import "./Register.scss";

const Register = () => {
  return (
    <div className="register" style={{ objectFit: "cover" }}>
      <Header login={false} />
      <Background login={false} />
      <RegisterBox />
    </div>
  );
};

export default Register;
