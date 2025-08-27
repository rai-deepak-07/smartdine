import React, { useState } from 'react';
import { UserContext } from './Context';
import { useCallback } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

const UserState = (props) => {

  const [userData, setuserData] = useState([]);
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

  const navigate = useNavigate();

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
    // window.location.href = './restaurant-login'; // or use react-router navigate
  }, []);

  
  return (
    <UserContext.Provider value={{ isLoggedIn, login, logout , userData, setuserData }}>
      {props.children}
    </UserContext.Provider>
  )
}

export default UserState
