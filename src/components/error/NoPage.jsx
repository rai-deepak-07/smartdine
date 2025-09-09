import { Link, Outlet, useLocation } from 'react-router-dom';
import './sidebars.scss'
import { useState } from 'react';
import { useEffect } from 'react';


const NoPage = () => {
  // const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 575);

  const loc = useLocation()
  const location = window.location.pathname;
  console.log(window.location.pathname);
  const items = [
    { "id": 1, "icon": "house-door", "name": "home", "target": "/home" },
    { "id": 2, "icon": "speedometer2", "name": "dashboard", "target": "/dashboard" },
    { "id": 3, "icon": "table", "name": "orders", "target": "/orders" },
    { "id": 4, "icon": "grid", "name": "products", "target": "/products" },
    { "id": 5, "icon": "people-fill", "name": "staff", "target": "/staff" },
  ];

  useEffect(() => {
    // const handleResize = () => {
    //   setIsLargeScreen(window.innerWidth >= 575);
    // };

    // window.addEventListener('resize', handleResize);
    // return () => {
    //   window.removeEventListener('resize', handleResize);
    // };
    // eslint-disable-next-line
  }, [loc]);

  return (
   <div>dakj</div>
    // <div id="Layout" className="container-fluid px-0">
    //   <div className="row m-0">
    //     <div className="col-md-2 px-0 d-md-block d-none">
    //       <div id='Sidebar' className="border-1 border-end">

    //         <Link to="/" className="link-body-emphasis text-decoration-none ps-3">
    //           <span className="fs-4">Portfolio</span>
    //         </Link>

    //         <hr />

    //         {/* SideBar Items */}
    //         <ul className="nav nav-pills mb-auto">
    //           {items.map((item) => (
    //             <li className="nav-item" key={item.id}>
    //               <Link to={item.target} className={`nav-link ${location === `/smartdine/${item.name}` ? 'active' : 'link-body-emphasis' }`} aria-current="page">
    //                 <i className={`bi bi-${item.icon}`}></i>
    //                 <span className='text-capitalize'>{item.name}</span>
    //               </Link>
    //             </li>
    //           ))}
    //         </ul>

    //       </div>
    //     </div>

    //     <div className="col-md-10 px-0" style={{ minHeight: "100vh" }}>

    //       {/* Header With Restauarnt Name Options */}
    //       <nav className="navbar navbar-expand-md bg-body-light border-bottom px-3">

    //         <div className="container-fluid px-0">

    //           <button className="navbar-toggler fs-6 border-0 focus-ring-none" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    //             <span className="navbar-toggler-icon"></span>
    //           </button>

    //           <span className="fs-4 text-capitalize ms-md-0 ms-5">{loc.pathname.split('/')}</span>
    //           <div>

    //           </div>

    //           {/* Profile Dropdown */}
    //           <div className="dropdown">
    //             <Link to="/" className='me-md-3' data-bs-toggle="dropdown" aria-expanded="false">
    //               <img src="https://erp.psit.ac.in/assets/img/Simages/2412429.jpg" alt="Profile" className="rounded-circle object-fit-fill" width="45" height="45" />
    //             </Link>

    //             <ul className="dropdown-menu text-small shadow-sm mt-3" style={{ left: "-120px" }}>
    //               <li><Link className="dropdown-item" to="/"><i className='bi bi-gear me-2'></i>Settings</Link></li>
    //               <li><Link className="dropdown-item" to="/"><i className='bi bi-person me-2'></i>Profile</Link></li>
    //               <li><hr className="dropdown-divider" /></li>
    //               <li><Link className="dropdown-item"><i className='bi bi-box-arrow-in-right me-2'></i>Sign out</Link></li>
    //             </ul>
    //           </div>

    //           {/* Show in Mobile Device */}
    //           <div className="offcanvas offcanvas-start d-md-none  w-50" tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">

    //             {/* Header Start Here */}
    //             <div className="offcanvas-header pb-0">
    //               <h5 className="offcanvas-title link-body-emphasis">Portfolio</h5>
    //             </div>

    //             {/* Body Start Here */}
    //             <div className="offcanvas-body pt-0" id='sid'>
    //               <hr />


    //               {/* SideBar Items */}
    //               <ul className="nav nav-pills mb-auto d-flex flex-column">
    //                 {items.map((item) => (
    //                   <li className="nav-item" key={item.id}>
    //                     <Link to={item.target} className={`nav-link ${location === `/smartdine/${item.name}` ? 'active' : 'link-body-emphasis'}`} aria-current="page">
    //                       <i className={`bi bi-${item.icon}`}></i>
    //                       <span className='text-capitalize'>{item.name}</span>
    //                     </Link>
    //                   </li>
    //                 ))}
    //               </ul>
    //             </div>
    //           </div>
    //         </div>
    //       </nav>

    //       <div className="row m-0 p-3 ">
    //         ksjaksjka
    //       </div>
    //       <Outlet />
    //     </div>
    //   </div>
    // </div>
  )
}

export default NoPage