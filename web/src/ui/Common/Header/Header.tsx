import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import "./Header.scss";
import { NavLink } from "react-router-dom";

window.onscroll = () => {
  const el = document.getElementById("content-header-wrapper");
  if (el !== null) {
    if (window.pageYOffset > 0) {
      el.className = "content-header-wrapper offset";
    } else {
      el.className = "content-header-wrapper";
    }
  }
};

const Header = () => {
  return (
    <div id="content-header-wrapper" className="content-header-wrapper">
      <a href="/browse">
        <div className="logo">
          <img src={process.env.PUBLIC_URL + "/hotflix.png"} />
        </div>
      </a>
      <div className="navigation-primary-wrapper">
        <NavLink to="/browse" activeStyle={{ fontWeight: "bold" }}>
          <span>Home</span>
        </NavLink>
        <NavLink to="/tv" activeStyle={{ fontWeight: "bold" }}>
          <span>TV Shows</span>
        </NavLink>
        <NavLink to="/movies" activeStyle={{ fontWeight: "bold" }}>
          <span>Movies</span>
        </NavLink>
        <NavLink to="/latest" activeStyle={{ fontWeight: "bold" }}>
          <span>Latest</span>
        </NavLink>
        <NavLink to="/mylist" activeStyle={{ fontWeight: "bold" }}>
          <span>My List</span>
        </NavLink>
      </div>
      <div className="navigation-secondary-wrapper">
        <span>
          <FontAwesomeIcon
            className="search-icon"
            icon={faSearch}
            size="lg"
            color="white"
          />
        </span>
        <div className="avatar-container">
          <img src={process.env.PUBLIC_URL + "/avatar.png"} />
          <span className="caret"></span>
        </div>
      </div>
    </div>
  );
};

export default Header;
