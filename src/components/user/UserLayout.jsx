import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom'
import { UserContext } from '../../context/Context'
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';

const UserLayout = () => {
  const { isUserLoggedIn, setIsUserLoggedIn, userData, setUserData } = useContext(UserContext);
  const location = navigator.geolocation.getCurrentPosition(success);
  function success(position){
    const location_url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${position.coords.latitude},${position.coords.longitude}&key=AIzaSyCb1KdgCcM82qyDXQPND2Mj9FhQVXRoI7Q`
    axios.get(location_url).then(response => {
      setUserData(
      response.data.results[0].address_components[3].long_name);
    })
    .catch(error => {
      console.error("error :",error);
    });
  }
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
  }, [isUserLoggedIn, location, navigate, userData]);

  return (
    isUserLoggedIn && (
      <div>
        <h2>User Layout</h2>
        <h2>{userData}</h2>
        <Outlet />
        <button onClick={handelLogOut}>Logout</button>
      </div>
    )
  )
}

export default UserLayout
