import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div>
      <nav className="navbar fixed-top navbar-expand-lg bg-transparent">
        <div className="container">
          <Link className="navbar-brand text-white" to="/">
            smartdine
          </Link>
          <button className="btn btn-outline-light rounded-pill">Login</button>
        </div>
      </nav>
    </div>
  );
};

export default Header;
