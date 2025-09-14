import React, { useContext, useEffect } from 'react';
import { ResturantContext } from '../../../context/Context';
import { useNavigate, useLocation, Outlet, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import './sidebars.scss'

const RestaurantLayout = () => {
  const { isLoggedIn, logout, restaurantData } = useContext(ResturantContext);
  console.log(restaurantData);


  const navigate = useNavigate();
  const location = useLocation();
  const loc = window.location.pathname;
  const image  = "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?semt=ais_incoming&w=740&q=80"

  const items = [
    { "id": 1, "icon": "house-door", "name": "home", "target": "home" },
    { "id": 2, "icon": "speedometer2", "name": "dashboard", "target": "dashboard" },
    { "id": 3, "icon": "table", "name": "orders", "target": "orders" },
    { "id": 4, "icon": "grid", "name": "menu", "target": "menu" },
    { "id": 5, "icon": "gear-wide-connected", "name": "tables", "target": "tables" },
    { "id": 6, "icon": "people-fill", "name": "staff", "target": "staff" },
  ];

  // Handle logout with toast promise
  const handleLogOutAsync = () => {
    return new Promise((resolve, reject) => {
      try {
        setTimeout(() => {
          logout();
          resolve();
        }, 1500);
      } catch (error) {
        reject(error);
      }
    });
  };

  useEffect(() => {
    if (!isLoggedIn) {
      // Redirect to login if not logged in
      navigate('/restaurant-login', { state: { from: location }, replace: true });
    }
  }, [isLoggedIn, navigate, location]);

  if (!isLoggedIn) {
    // Optionally render null or loading state while redirecting
    return null;
  }

  return (
    <>

      <div id="Layout" className="container-fluid px-0">
        <div className="row m-0">
          <div className="col-md-2 px-0 d-md-block d-none">
            <div id='Sidebar' className="border-1 border-end">

              <Link to="/" className="link-body-emphasis text-decoration-none ps-3">
                <span className="fs-4">{restaurantData.res_name}</span>
              </Link>

              <hr />

              {/* SideBar Items */}
              <ul className="nav nav-pills mb-auto">
                {items.map((item) => (
                  <li className="nav-item" key={item.id}>
                    <Link to={`${item.target}`} className={`nav-link ${loc === `/smartdine/restaurant/${item.name}` ? 'active' : 'link-body-emphasis'}`} aria-current="page">
                      <i className={`bi bi-${item.icon}`}></i>
                      <span className='text-capitalize'>{item.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>

            </div>
          </div>

          <div className="col-md-10 px-0 border-light-subtle border-bottom " style={{ minHeight: "100vh" }}>

            {/* Header With Restauarnt Name Options */}
            <div className="container-fluid position-fixed z-2" style={{width: '-webkit-fill-available'}}>

            <nav className="navbar navbar-expand-md border-bottom bg-white px-3">

              <div className="container-fluid px-0">

                <button className="navbar-toggler fs-6 border-0 focus-ring-none" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon"></span>
                </button>

                <span className="fs-4 text-capitalize ms-md-0 ms-5">{location.pathname.split('/')[2]}</span>
                <div>

                </div>

                {/* Profile Dropdown */}
                <div className="dropdown">
                  <Link to="/" data-bs-toggle="dropdown" aria-expanded="false">
                    <img src={image} alt="Profile" className="rounded-circle object-fit-fill" width="45" height="45" />
                  </Link>

                  <ul className="dropdown-menu text-small shadow-sm mt-3" style={{ left: "-120px" }}>
                    <li><Link className="dropdown-item" to="/"><i className='bi bi-gear me-2'></i>Settings</Link></li>
                    <li><Link className="dropdown-item" to="/"><i className='bi bi-person me-2'></i>Profile</Link></li>
                    <li><hr className="dropdown-divider" /></li>
                    <li>
                      <Link className="dropdown-item" onClick={() =>
                        toast.promise(handleLogOutAsync(), {
                          loading: 'Logging out...',
                          success: <b>Logged out successfully!</b>,
                          error: <b>Logout failed.</b>,
                        }) 
                      }>
                        <i className='bi bi-box-arrow-in-right me-2'></i>Sign out
                      </Link>
                    </li>
                  </ul>
                </div>

                {/* Show in Mobile Device */}
                <div className="offcanvas offcanvas-start d-md-none w-75" tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">

                  {/* Header Start Here */}
                  <div className="offcanvas-header pb-0">
                    <h5 className="offcanvas-title link-body-emphasis">{restaurantData.res_name}</h5>
                  </div>

                  {/* Body Start Here */}
                  <div className="offcanvas-body pt-0" id ="sid">
                  <hr />

                    {/* SideBar Items */}
                    <ul className="nav nav-pills mb-auto d-flex flex-column">
                      {items.map((item) => (
                        <li className="nav-item" data-bs-dismiss="offcanvas" key={item.id}>
                          <Link to={item.target} className={`nav-link ${loc === `/smartdine/restaurant/${item.name}` ? 'active' : 'link-body-emphasis'}`} aria-current="page">
                            <i className={`bi bi-${item.icon}`}></i>
                            <span className='text-capitalize'>{item.name}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </nav>
            </div>

            <div className="container-fluid px-4 pt-4 mt-5">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RestaurantLayout;
