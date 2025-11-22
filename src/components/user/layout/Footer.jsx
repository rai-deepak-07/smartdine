import React, { useContext } from "react";
import Nav from "react-bootstrap/Nav";
import { UserContext } from "../../../context/Context";
import { Link, useLocation } from "react-router-dom";

const Footer = () => {
  const { logout } = useContext(UserContext);
  const location = useLocation(); // get current path

  const footerData = [
    { id: 1, label: "Home", icon: "bi-house-door", url: "user" },
    { id: 2, label: "Bookings", icon: "bi-calendar2-check", url: "bookings" },
    { id: 3, label: "Orders", icon: "bi-bag-check", url: "orders" },
    { id: 4, label: "Profile", icon: "bi-person", url: "profile" },
    { id: 5, label: "Logout", icon: "bi-box-arrow-right", url: "" },
  ];


  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        width: "100%",
        background: "#fff",
        zIndex: 999,
        borderTop: "1px solid #ddd",
      }}
    >
      <Nav className="justify-content-around text-center px-md-5 px-2">
        {footerData.map((item) =>
          item.id !== 5 ? (
            <Nav.Item key={item.id}>
              <Nav.Link
                as={Link}
                to={item.id === 1 ? `/user` : `/user/${item.url}`}
                className={`py-2 ${location.pathname === (item.id === 1 ? `/user` : `/user/${item.url}`) ? "text-primary": "text-secondary"}`}
                style={{
                  borderBottom:
                    location.pathname === (item.id === 1 ? `/user` : `/user/${item.url}`)
                      ? "2px solid #0d6efd"
                      : "none",
                }}
              >
                <i className={`bi ${item.icon} fs-4`}></i>
                <span className="d-none d-md-inline ms-1">{item.label}</span>
              </Nav.Link>


            </Nav.Item>
          ) : (
            <Nav.Item key={item.id}>
              <Nav.Link onClick={logout} className="py-2 text-danger">
                <i className="bi bi-box-arrow-right fs-4"></i>
                <span className="d-none d-md-inline ms-1">Logout</span>
              </Nav.Link>
            </Nav.Item>
          )
        )}
      </Nav>
    </div>
  );
};

export default Footer;
