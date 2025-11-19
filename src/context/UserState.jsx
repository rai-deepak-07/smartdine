import React, { useEffect, useState } from 'react';
import { UserContext } from './Context';
import { useCallback } from 'react';
import {jwtDecode} from 'jwt-decode';

import { useNavigate } from 'react-router-dom';
import UserApi from '../apiservice/UserApi';
import axios from 'axios';

const UserState = (props) => {
  
  const navigate = useNavigate();
  
  // Checking Token Expiry
  const isTokenExpired = (token) => {
      try {
        const { exp } = jwtDecode(token);
        return Date.now() >= exp * 1000;
      } catch {
        return true;
      }
    };
  
  // Set Login State (Logged In or Logged Out)
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const token = localStorage.getItem('user_access_token');
    return token && !isTokenExpired(token);
  });

  // Login handler: save tokens and set login state
  const login = ({ accessToken, refreshToken, user_id }) => {
    localStorage.setItem('user_access_token', accessToken);
    localStorage.setItem('user_refresh_token', refreshToken);
    localStorage.setItem("user_id", user_id);
    setIsLoggedIn(true);
  };

  // Logout handler: remove tokens and update state
  const logout = useCallback(() => {
    localStorage.removeItem('user_access_token');
    localStorage.removeItem('user_refresh_token');
    localStorage.removeItem("user_id");
    setIsLoggedIn(false);
    navigate('/user-login');
  }, [navigate]);

  // Map API KEY
  const locAPI = process.env.REACT_APP_LOCATION_API;
  const [location, setLocation] = useState("");

  // Location Handler: Get Current Location
  const getLocation = useCallback((position) => {
    const location_url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${position.coords.latitude},${position.coords.longitude}&key=${locAPI}`;
    console.log(location_url);
    
    axios.get(location_url).then(response => {
      const components = response.data.results[0].address_components;
      const city = components.find(c => c.types.includes("administrative_area_level_2"));
      if(city){
        setLocation(city.long_name.split(" ")[0]);
        fetchLocalRestaurants(city.long_name.split(" ")[0]);
      }
    })
    .catch(error => {
      console.error("error :",error);
    });
  }, [locAPI]);

  const [userData, setuserData] = useState([]);

  // User Details Handler: Fetch User Details
  const fetchUserDetails = () => {
      const user_id = localStorage.getItem('user_id');
      UserApi.get(`user/details/${user_id}/`)
      .then(response => {
        setuserData(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the user data!", error);
      });
  };

  const [localRestaurantData, setLocalRestaurantData] = useState([]);

  // Local Restaurants Handler: Fetch Local Restaurants
  const fetchLocalRestaurants = (loc) => {
    UserApi.get(`restaurant/details/?verification_status=verified&city=${loc}`)
    .then(response => {
      setLocalRestaurantData(response.data);
    })
    .catch(error => {
      console.error("There was an error fetching the restaurant data!", error);
    });
  };


  useEffect(() => {
  if(isLoggedIn){
      navigator.geolocation.getCurrentPosition(getLocation);
      fetchUserDetails();
    }

  if(!isLoggedIn){
      setuserData([]);
      setLocation("");
      setLocalRestaurantData([]);
  }

  }, [isLoggedIn, getLocation]);

  return (
    <UserContext.Provider value={{ isLoggedIn, login, logout , userData, location, localRestaurantData }}>
      {props.children}
    </UserContext.Provider>
  )
}

export default UserState;