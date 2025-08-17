import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom'
import { UserContext } from '../../context/Context'
import { useContext, useEffect } from 'react';

const UserLayout = () => {
  const { isUserLoggedIn, setIsUserLoggedIn, userData, setUserData } = useContext(UserContext);
  const location = useLocation();
  const navigate = useNavigate();

   // Function for handling user logout
  const handelLogOut = () => {
        localStorage.removeItem("user_access_token")
        localStorage.removeItem("user_refresh_token")
        localStorage.removeItem("user_id")

        let logOut = setInterval(() => {
            setIsUserLoggedIn(false)
            navigate('/user-login')
            return clearInterval(logOut)
        }, 1500);
  }

  useEffect(() => {
    if (!isUserLoggedIn) {
      navigate('/user-login', { state: { from: location } });
    }
  }, [isUserLoggedIn, location, navigate]);

  return (
    isUserLoggedIn && (
      <div>
        <h2>User Layout</h2>
        <Outlet />
        <button onClick={handelLogOut}>Logout</button>
      </div>
    )
  )
}

export default UserLayout
