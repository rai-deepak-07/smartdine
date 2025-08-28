import React, { useEffect, useState } from 'react';
import { UserContext } from './Context';
import { useCallback } from 'react';
import {jwtDecode} from 'jwt-decode';

import { useNavigate } from 'react-router-dom';
// import UserApi from '../apiservice/UserApi';
import axios from 'axios';

const UserState = (props) => {
  
  const navigate = useNavigate();
  
  const isTokenExpired = (token) => {
      try {
        const { exp } = jwtDecode(token);
        return Date.now() >= exp * 1000;
      } catch {
        return true;
      }
    };
  

  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const token = localStorage.getItem('user_access_token');
    return token && !isTokenExpired(token);
  });
  
  
  // Login handler: save tokens and set login state
  const login = ({ accessToken, refreshToken, user_id }) => {
    localStorage.setItem('user_access_token', accessToken);
    localStorage.setItem('user_refresh_token', refreshToken);
    localStorage.setItem("user_id", user_id);
    // console.log('Testing token expiry:', isTokenExpired(localStorage.getItem('user_access_token')));
    setIsLoggedIn(true);
  };


  // Logout handler: remove tokens and update state
  const logout = useCallback(() => {
    localStorage.removeItem('user_access_token');
    localStorage.removeItem('user_refresh_token');
    localStorage.removeItem("user_id");
    setIsLoggedIn(false);
    navigate('/user-login');
    // window.location.href = './restaurant-login'; // or use react-router navigate
  }, []);


  // Fetch Current Location
  const locAPI = process.env.REACT_APP_LOCATION_API;
  const [location, setLocation] = useState("");
  
  const getLocation = (position) => {
    const location_url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${position.coords.latitude},${position.coords.longitude}&key=${locAPI}`;

    axios.get(location_url).then(response => {
      const components = response.data.results[0].address_components;
      const city = components.find(c => c.types.includes("administrative_area_level_2"));
      if(city){
        setLocation(city.long_name.split(" ")[0]);
      }
    })
    .catch(error => {
      console.error("error :",error);
    });
  }

  // Fetch User Details
const [userData, setuserData] = useState([]);

// const fetchUserDetails = () => {
//   const user_id = localStorage.getItem('user_id');
//   UserApi.get(`details/${user_id}/`)
//   .then(response => {
//     setuserData(response.data);
//     console.log(response);
//   })
//   .catch(error => {
//     console.error("There was an error fetching the user data!", error);
//   });
// };
  
 useEffect(() => {
    navigator.geolocation.getCurrentPosition(getLocation);
  }, []);

  
  return (
    <UserContext.Provider value={{ isLoggedIn, login, logout , userData, location, getLocation }}>
      {props.children}
    </UserContext.Provider>
  )
}

export default UserState
