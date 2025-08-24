import React, { useContext, useEffect } from 'react';
import { ResturantContext } from '../../../context/Context';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import toast from 'react-hot-toast';

const RestaurantLayout = () => {
  const { isLoggedIn, logout } = useContext(ResturantContext);

  const navigate = useNavigate();
  const location = useLocation();

  // Handle logout with toast promise
  const handleLogOutAsync = () => {
    return new Promise((resolve, reject) => {
      try {
        // Call context logout to clear tokens and update state
        setTimeout(() => {
          logout();
          resolve(); // Simulate successful logout
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
    <div>
      <h2>Restaurant Layout</h2>
      <Outlet />
      <button
        onClick={() =>
          toast.promise(handleLogOutAsync(), {
            loading: 'Logging out...',
            success: <b>Logged out successfully!</b>,
            error: <b>Logout failed.</b>,
          })
        }
      >
        Logout
      </button>
    </div>
  );
};

export default RestaurantLayout;
