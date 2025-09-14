import { Link } from 'react-router-dom';

const Footer = () => {
  const footerTab1 = [
    { "id": 1, "name": "Partner With Us", "to": "/partner-with-us" },
    { "id": 2, "name": "LogIn", "to": "/restaurant-login" },
    { "id": 3, "name": "SignIn", "to": "/restaurant-register" },
    { "id": 4, "name": "FAQs", "to": "/" },
  ];

  const footerTab2 = [
    { "id": 1, "name": "What's New", "to": "/new-features" },
    { "id": 2, "name": "Offers", "to": "/offers" },
    { "id": 3, "name": "Forget Password", "to": "/forget-password" },
    { "id": 4, "name": "Contact Us", "to": "/contact-us" },
  ];

  const socialLogo = [
    { "id": 1, "icon": "instagram", "to": "/" },
    { "id": 2, "icon": "linkedin", "to": "/" },
    { "id": 3, "icon": "github", "to": "/" },
  ];

  return (
    <footer className='container-fluid shadow-lg border-top'>
      <div className="container py-md-5 py-4">
        <div className="row">

          {/* Left column: Logo, description, icons */}
          <div className="col-12 col-md-3 mb-5 mb-md-0 d-flex flex-column align-items-start">
            <span className="fs-4 fw-bold mb-2 f1">SmartDine</span>
            <span className="text-muted mb-2 f5">
              Empowering restaurants with seamless reservations and payment solutions.
            </span>

            {/* Social icons (Bootstrap Icons) */}
            <div className='fs-5 myicon'>
              {socialLogo.map((item) => (
                <Link key={item.id} to={item.to} className="me-3">
                  <i className={`bi bi-${item.icon}`}></i>
                </Link>
              ))}
            </div>

          </div>

          {/* For Space */}
          <div className="col-md-1"></div>

          {/* Footer Tab 1 Links */}
          <div className="col-6 col-md-2 mb-4 mb-md-0">
            <h6 className="fw-bold mb-3 d-block text-uppercase">For Restaurants</h6>

            <ul className="nav flex-column small f2">
              {footerTab1.map((item) => (
                <li key={item.id} className="nav-item mb-2">
                  <Link to={item.to} className="p-0 text-decoration-none text-body-secondary">{item.name}</Link >
                </li>
              ))}
            </ul>
          </div>

          {/* Footer Tab 2 Links */}
          <div className="col-6 col-md-2 mb-4 mb-md-0">
            <h6 className="fw-bold mb-3 d-block text-uppercase">Helpful Links</h6>
            <ul className="nav flex-column small f2">
              {footerTab2.map((item) => (
                <li key={item.id} className="nav-item mb-2">
                  <Link to={item.to} className="p-0 text-decoration-none text-body-secondary">{item.name}</Link >
                </li>
              ))}
            </ul>
          </div>

          {/* Right column: Form */}
          <div className="col-md-4 mb-3 my-md-0 my-3">
            <form>
              <h5 className="text-capitalize fw-bold mb-2">Subscribe to our newsletter</h5>
              <p className='f5'>Monthly digest of what's new and exciting from us.</p>
              <div className="d-flex flex-column flex-sm-row w-100 gap-2">
                <input
                  id="newsletter1"
                  type="email"
                  className="form-control rounded-0 f4"
                  placeholder="Email address"
                />
                <button className="btn btn-dark rounded-0">Subscribe</button>
              </div>
            </form>
          </div>

          <hr className='my-4' />

          {/* Bottom Legal Links */}
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-center small f2" style={{ zIndex: 2 }}>
            <span className="text-muted">&copy; 2025 SmartDine. All rights reserved.</span>
            <div className='mt-md-0 mt-3 align-content-around'>
              <Link to="/" className="text-muted text-decoration-none me-3">Privacy Policy</Link>
              <Link to="/" className="text-muted text-decoration-none me-3">Terms of Service</Link>
            </div>
          </div>

        </div>
      </div>
    </footer>
  )
}
export default Footer