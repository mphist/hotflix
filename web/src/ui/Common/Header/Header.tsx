import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
import "./Header.scss";

interface Props {
  mylist?: boolean;
}

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

const Header = ({ mylist }: Props) => {
  const handleLogout = () => {
    sessionStorage.clear();
    window.location.replace(
      process.env.NODE_ENV === "production"
        ? process.env.REACT_APP_BACKEND_HOST_PROD + "/logout"
        : process.env.REACT_APP_BACKEND_HOST_DEV + "/logout"
    );
  };

  return (
    <div
      id="content-header-wrapper"
      className="content-header-wrapper"
      style={mylist ? { backgroundColor: "#000" } : {}}
    >
      <NavLink to="/browse">
        <div className="logo">
          <img src={process.env.PUBLIC_URL + "/hotflix.png"} />
        </div>
      </NavLink>
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
        <div className="avatar-wrapper">
          <div className="avatar-container">
            <img src={process.env.PUBLIC_URL + "/avatar.png"} />
            <span className="caret-1"></span>
          </div>
          <div className="drop-down">
            <span className="caret-2"></span>
            <div style={{ padding: "13px 0" }}>
              <li>Manage Profiles</li>
            </div>
            <div>
              <li
                style={{
                  height: "15px",
                  border: "1px solid #222",
                  backgroundColor: "#000",
                  padding: "10px 0",
                  cursor: "default",
                }}
              ></li>
            </div>
            <div style={{ padding: "10px 0" }}>
              <li>Account</li>
              <li>Help Center</li>
              <li onClick={handleLogout}>Sign out of Hotflix</li>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
