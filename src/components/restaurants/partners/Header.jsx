import { Link } from "react-router-dom";

const Header = () => {
  return (
    <nav className="navbar fixed-top navbar-expand-lg bg-transparent">
        <div className="container">
          <Link className="navbar-brand text-white" to="/">
            SmartDine
          </Link>
          <Link to="/restaurant-login" className="btn btn-outline-light rounded-pill px-5">Login</Link>
        </div>
      </nav>
  );
};

export default Header;
