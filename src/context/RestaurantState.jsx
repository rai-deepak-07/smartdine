import React, { useState, useEffect } from 'react';
import { ResturantContext } from './Context';
import { useCallback } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

const RestaurantState = (props) => {
  const isTokenExpired = (token) => {
    try {
      const { exp } = jwtDecode(token);
      return Date.now() >= exp * 1000;
    } catch {
      return true;
    }
  };
  
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const token = localStorage.getItem('restaurant_access_token');
    return token && !isTokenExpired(token);
  });

  const navigate = useNavigate();


  // Login handler: save tokens and set login state
  const login = ({ accessToken, refreshToken, res_reg_id }) => {
    localStorage.setItem('restaurant_access_token', accessToken);
    localStorage.setItem('restaurant_refresh_token', refreshToken);
    localStorage.setItem("restaurant_res_reg_id", res_reg_id); 
    setIsLoggedIn(true);
  };

  // Logout handler: remove tokens and update state
  const logout = useCallback(() => {
    localStorage.removeItem('restaurant_access_token');
    localStorage.removeItem('restaurant_refresh_token');
    localStorage.removeItem("restaurant_res_reg_id");
    setIsLoggedIn(false);
    navigate('/restaurant-login');
    // window.location.href = './restaurant-login'; // or use react-router navigate
  }, []);

  return (
    <ResturantContext.Provider value={{ isLoggedIn, login, logout }}>
      {props.children}
    </ResturantContext.Provider>
  );
};

export default RestaurantState;
