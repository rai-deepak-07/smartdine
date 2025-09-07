import { Link } from 'react-router-dom'
import logo from '../../../assets/image/general/logo.png'
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation()

  const NavList = [
    { "id": "1", "to": "/partner-with-us", "name": "Add Restaurant", "icon": "patch-plus" },
    { "id": "3", "to": "/user-register", "name": "SignUp", "icon": "person-plus" },
    { "id": "2", "to": "/user-login", "name": "Login", "icon": "box-arrow-in-right" },
  ];

  useEffect(() => {
    // const navbar = document.getElementById('general-navbar');
    // location.pathname!=='/'? navbar.classList.add('navbar-scrolled'):navbar.classList.remove('navbar-scrolled');
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [location]);

  return (
    <header className='fixed-top'>
      <nav className={`navbar navbar-dark navbar-expand-lg ${scrolled? "navbar-scrolled" : ""}`} id='general-navbar'>
        <div className="container">

          {/* Logo */}
          <Link className="navbar-brand" to="/">
            <img src={logo} className='img-fluid'  alt="Logo" style={{ maxWidth: '100px', height: 'auto' }}/>
          </Link>

          {/* Sidebar Toggler */}
          <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
            <span className="bi bi-list-nested"></span>
          </button>

          {/* Sidebar Offcanvas */}
          <div className="offcanvas offcanvas-start" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel"
            style={{ background: "rgba(0,0,0,0.9)" }}>
            <div className="offcanvas-header px-4 justify-content-between">
              <Link to="/">
                <img src={logo} className='img img-fluid' alt="Logo" style={{ maxWidth: '150px', height: 'auto' }}/>
              </Link>
              <button type="button" className="btn btn-outline-danger btn bi bi-x-lg" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>

            <div className="offcanvas-body px-lg-0 px-5">
              <ul className="navbar-nav fs-5 ms-auto">
                {NavList.map(list => (
                  <li key={list.id} className="nav-item pb-lg-0 pb-3 px-3" data-bs-dismiss="offcanvas"> 
                    <Link className="my_link" to={list.to}>
                      <i className={`bi bi-${list.icon} pe-2`}></i> {list.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header