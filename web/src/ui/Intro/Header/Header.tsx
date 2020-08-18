import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Header.scss";

interface PropTypes {
  login: boolean;
}

const Header = ({ login }: PropTypes) => {
  if (login) {
    return (
      <div className="header-wrapper">
        <div className="logo-container">
          <img
            className="logo"
            src={process.env.PUBLIC_URL + "/hotflix.png"}
            alt="hotflix-logo"
          />
        </div>
        <div className="login-btn">
          <Link to="/login">
            <Button variant="primary">Sign In</Button>
          </Link>
        </div>
      </div>
    );
  } else {
    return (
      <div className="header-wrapper">
        <div className="logo-container">
          <img
            className="logo"
            src={process.env.PUBLIC_URL + "/hotflix.png"}
            alt="hotflix-logo"
          />
        </div>
      </div>
    );
  }
};

export default Header;
