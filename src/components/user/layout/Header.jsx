import React, { useContext } from "react";
import { UserContext } from "../../../context/Context";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { Button } from "react-bootstrap";

const Header = () => {
  const { location, logout, userData } = useContext(UserContext);

  // Create simplified config
  const config = {
    avatar: userData?.user_name?.charAt(0).toUpperCase() || "U",
    welcome: userData?.user_name || "User",
    location: location || "Not specified",
    email: userData?.user_email || "No email",
    phone: userData?.user_mobile_no || "No phone",
  };

  if (!userData && !location) {
    return (
      <div className="alert alert-warning m-3">
        User data not available. Please check your context provider.
      </div>
    );
  }

  return (
    <Navbar bg="light" expand="lg" className="shadow-sm" sticky="top">
      <Container>
        {/* Avatar */}
        <span
          className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-md-2"
          style={{ width: "40px", height: "40px", fontSize: "20px" }}
        >
          {config.avatar}
        </span>
        <Navbar className="fw-bold fs-5 f6 pb-0">
          Welcome, {config.welcome}
        </Navbar>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav className="align-items-md-center my-md-0 my-4 mx-md-0 mx-3">
            {/* Location */}
            <span className="me-4 text-muted mb-md-0 mb-3">
              <i className="bi bi-geo-alt-fill me-1"></i>
              {config.location}
            </span>

            {/* Email */}
            <span className="me-4 mb-md-0 mb-3">
              <i className="bi bi-envelope me-2"></i>
              {config.email}
            </span>

            {/* Phone */}
            <span className="me-4 mb-md-0 mb-3">
              <i className="bi bi-phone me-2"></i>
              {config.phone}
            </span>

            {/* Logout Button */}
            <Button variant="danger" size="md" className="rounded-1" onClick={logout}>
              Logout
              <i className="bi bi-box-arrow-right ms-2"></i>
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
