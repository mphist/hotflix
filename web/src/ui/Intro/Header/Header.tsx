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
        <img className="logo" src={process.env.PUBLIC_URL + "/hotflix.png"} />
        <Link to="/login">
          <Button variant="primary">Sign In</Button>
        </Link>
      </div>
    );
  } else {
    return (
      <div className="header-wrapper">
        <img className="logo" src={process.env.PUBLIC_URL + "/hotflix.png"} />
      </div>
    );
  }
};

export default Header;
