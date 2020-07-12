import React from "react";
import Header from "../Intro/Header/Header";
import Background from "../Intro/Background/Background";
import LoginBox from "./LoginBox";

const Login = () => {
  return (
    <div className="login" style={{ objectFit: "cover", height: "990px" }}>
      <Header login={false} />
      <Background login={false} />
      <LoginBox />
    </div>
  );
};

export default Login;
