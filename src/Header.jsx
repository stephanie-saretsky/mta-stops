import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./main.css";

class Header extends Component {
  render = () => {
    return (
      <div className="bar">
        {/* <Link className="nav-logo" to={"/"}> */}
        <img className="logo" src="/bus.png" />
        {/* </Link> */}
        <h2 className="nav-title">MTA STOPS</h2>
      </div>
    );
  };
}

export default Header;
