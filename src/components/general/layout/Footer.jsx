import React from 'react'
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className='container-fluid shadow-lg border-top'>
      <div className="container py-md-5 py-4">
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

          {/* For Space */}
          <div className="col-md-1"></div>

          {/* Product Links */}
          <div className="col-6 col-md-2 mb-4 mb-md-0">
            <h6 className="fw-bold mb-2 d-block text-uppercase">For Restaurants</h6>
            <ul class="nav flex-column small">
              <li class="nav-item mb-2">
                <Link to="#" class="nav-link p-0 text-body-secondary">Home</Link >
              </li>
              <li class="nav-item mb-2">
                <Link to="#" class="nav-link p-0 text-body-secondary">Features</Link>
              </li>
              <li class="nav-item mb-2">
                <Link to="#" class="nav-link p-0 text-body-secondary">Pricing</Link >
              </li>
              <li class="nav-item mb-2">
                <Link to="#" class="nav-link p-0 text-body-secondary">FAQs</Link >
              </li>
              <li class="nav-item mb-2">
                <Link to="#" class="nav-link p-0 text-body-secondary">About</Link >
              </li>
            </ul>
          </div>

          {/* Product Links */}
          <div className="col-6 col-md-2 mb-4 mb-md-0">
            <h6 className="fw-bold mb-2 d-block text-uppercase">For Restaurants</h6>
            <ul class="nav flex-column small">
              <li class="nav-item mb-2">
                <Link to="#" class="nav-link p-0 text-body-secondary">Home</Link >
              </li>
              <li class="nav-item mb-2">
                <Link to="#" class="nav-link p-0 text-body-secondary">Features</Link>
              </li>
              <li class="nav-item mb-2">
                <Link to="#" class="nav-link p-0 text-body-secondary">Pricing</Link >
              </li>
              <li class="nav-item mb-2">
                <Link to="#" class="nav-link p-0 text-body-secondary">FAQs</Link >
              </li>
              <li class="nav-item mb-2">
                <Link to="#" class="nav-link p-0 text-body-secondary">About</Link >
              </li>
            </ul>
          </div>


          <div class="col-md-4 mb-3 my-md-0 my-3">
            <form>
              <h5 className="fw-bold mb-2">Subscribe to our newsletter</h5>
              <p>Monthly digest of what's new and exciting from us.</p>
              <div class="d-flex flex-column flex-sm-row w-100 gap-2">
                <label htmlFor="newsletter1" className="visually-hidden"
                >Email address</label>
                <input
                  id="newsletter1"
                  type="email"
                  className="form-control form-control-sm"
                  placeholder="Email address"
                />
                <button class="btn btn-dark rounded-0">Subscribe</button>
              </div>
            </form>
          </div>

          <hr className='my-4'/>

          {/* Bottom Legal Links */}
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-center small" style={{ zIndex: 2 }}>
            <span className="text-muted">&copy; 2025 SmartDine. All rights reserved.</span>
            <div>
              <Link to="#" className="text-muted text-decoration-none me-3">Privacy Policy</Link>
              <Link to="#" className="text-muted text-decoration-none me-3">Terms of Service</Link>
            </div>
          </div>

        </div>
      </div>
    </footer>
  )
}
export default Footer