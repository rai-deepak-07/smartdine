import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { AdminContext } from '../../context/Context'
import { useContext, useEffect } from 'react';

const AdminLayout = () => {
  const { isAdminLoggedIn} = useContext(AdminContext);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAdminLoggedIn) {
      navigate('/admin-login', { state: { from: location } });
    }
  }, [isAdminLoggedIn, location, navigate]);
  return (
    isAdminLoggedIn && (  
    <div>
      <h2>Admin Layout</h2>
      {/* Header Start */}
      <header>
        <h1>Admin Header</h1>
      </header>
      {/* Header End */}

      {/* Main Content Start */}
      <Outlet/>
      {/* Main Content End */}

      {/* Footer Start */}
      <footer>
        <p>© 2023 SmartDine. All rights reserved.</p>
      </footer>
      {/* Footer End */}
    
    
    </div>
  )
);
}

export default AdminLayout
