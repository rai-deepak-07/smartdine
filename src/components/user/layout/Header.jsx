import React, { useContext } from "react";
import { UserContext } from "../../../context/Context";
<<<<<<< HEAD
import { Link } from "react-router-dom";

const Header = () => {
  const { logout, userData } = useContext(UserContext);
=======

const Header = () => {
  const { location, logout, userData } = useContext(UserContext);
>>>>>>> main

  // Create the config object with fallbacks
  const config = {
    userSection: {
      avatar: userData?.user_name?.charAt(0).toUpperCase() || "U",
      welcomeText: `Welcome, ${userData?.user_name || "User"}!`,
      locationText: location || "Not specified",
      contact: userData
        ? [
            {
              icon: "bi bi-envelope",
              text: userData.user_email || "No email",
            },
            {
              icon: "bi bi-phone",
              text: userData.user_mobile_no || "No phone",
            },
          ]
        : [],
    },
  };

  // If context is not available, show a fallback
  if (!userData && !location) {
    return (
      <div className="alert alert-warning m-3">
        User data not available. Please check your context provider.
      </div>
    );
  }

<<<<<<< HEAD
  const location = "Kanpur";
=======
>>>>>>> main
  return (
    <div className="container-fluid py-3">
      <div className="card mb-4 shadow-sm">
        <div className="card-body">
          <div className="row align-items-center">
            <div className="col-md-8">
              <div className="d-flex align-items-center">
                <div
                  className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-3"
                  style={{ width: "45px", height: "45px", fontSize: "24px" }}
                >
                  {config.userSection.avatar}
                </div>
                <div>
                  <h4 className="mb-1">{config.userSection.welcomeText}</h4>
                  <p className="text-muted mb-0">
                    <i className="bi bi-geo-alt-fill me-2"></i>
                    {config.userSection.locationText}
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-4 text-md-end mt-3 mt-md-0">
              {config.userSection.contact.map((item, idx) => (
                <p key={idx} className="mb-1">
                  <i className={`${item.icon} me-2 text-primary`}></i>
                  {item.text}
                </p>
              ))}

              <span className="fs-3" cursor="pointer" onClick={logout}>
                <i className="bi bi-box-arrow-left"></i>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
