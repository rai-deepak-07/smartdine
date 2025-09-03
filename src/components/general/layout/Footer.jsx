import React from 'react'
import {Link} from 'react-router-dom';

const Footer = () => {
  return (
    <>
      <footer className="container rounded-4 shadow-lg p-5">

        {/* Main Footer Content */}
        <div className="row">

          {/* Left column: Logo, description, icons */}
          <div className="col-12 col-md-3 mb-5 mb-md-0 d-flex flex-column align-items-start">
            <span className="fs-4 fw-bold mb-2">SmartDine</span>
            <span className="text-muted mb-2 small">
              Empowering restaurants with seamless reservations and payment solutions.
            </span>
          
            <div>
              {/* Social icons (Bootstrap Icons) */}
              <Link to="#" className="me-3 fs-4 text-dark"><i className="bi bi-instagram"></i></Link>
              <Link to="#" className="me-3 fs-4 text-dark"><i className="bi bi-linkedin"></i></Link>
              <Link to="#" className="me-3 fs-4 text-dark"><i className="bi bi-github"></i></Link>
            </div>
          </div>

          {/* Product Links */}
          <div className="col-6 col-md-3 mb-4 mb-md-0">
            <span className="fw-bold mb-2 d-block text-uppercase">For Restaurants</span>
            <ul className="list-unstyled small">
              <li><Link to="#" className="text-muted text-decoration-none">Partner With Us</Link></li>
              <li><Link to="#" className="text-muted text-decoration-none">SignUp</Link></li>
              <li><Link to="#" className="text-muted text-decoration-none">Login</Link></li>
            </ul>
          </div>

          {/* Resources Links */}
          <div className="col-6 col-md-3 mb-4 mb-md-0">
            <span className="fw-bold mb-2 d-block">Resources</span>
            <ul className="list-unstyled small">
              <li><Link to="#" className="text-muted text-decoration-none">Documentation</Link></li>
              <li><Link to="#" className="text-muted text-decoration-none">Tutorials</Link></li>
              <li><Link to="#" className="text-muted text-decoration-none">Blog</Link></li>
              <li><Link to="#" className="text-muted text-decoration-none">Support</Link></li>
            </ul>
          </div>
          {/* Company Links */}
          <div className="col-12 col-md-3">
            <span className="fw-bold mb-2 d-block">Company</span>
            <ul className="list-unstyled small">
              <li><Link to="#" className="text-muted text-decoration-none">About</Link></li>
              <li><Link to="#" className="text-muted text-decoration-none">Careers</Link></li>
              <li><Link to="#" className="text-muted text-decoration-none">Partners</Link></li>
              <li><Link to="#" className="text-muted text-decoration-none">Contact</Link></li>
            </ul>
          </div>
        </div>
        <hr className="mt-5" />

        {/* Bottom Legal Links */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center small" style={{ zIndex: 2 }}>
          <span className="text-muted">&copy; 2025 SmartDine. All rights reserved.</span>
          <div>
            <Link to="#" className="text-muted text-decoration-none me-3">Privacy Policy</Link>
            <Link to="#" className="text-muted text-decoration-none me-3">Terms of Service</Link>
            <Link to="#" className="text-muted text-decoration-none">Cookies Settings</Link>
          </div>
        </div>
      </footer>
    </>
  )
}
export default Footer