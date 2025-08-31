import emailjs from "emailjs-com";
import React, { useState, useEffect } from 'react';
import { ResturantContext } from './Context';
import { useCallback } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import RestaurantApi from '../apiservice/RestaurantApi';

const RestaurantState = (props) => {
  
  // Token Verification
  const isTokenExpired = (token) => {
    try {
      const { exp } = jwtDecode(token);
      return Date.now() >= exp * 1000;
    } catch {
      return true;
    }
  };
  
  // Login State Management
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const token = localStorage.getItem('restaurant_access_token');
    return token && !isTokenExpired(token);
  });

  const navigate = useNavigate();

  // Login handler: save tokens and set login state
  const login = ({ accessToken, refreshToken, user_id }) => {
    localStorage.setItem('restaurant_access_token', accessToken);
    localStorage.setItem('restaurant_refresh_token', refreshToken);
    localStorage.setItem("restaurant_reg_id", user_id);
    setIsLoggedIn(true);
  };

  // Logout handler: remove tokens and update state
  const logout = useCallback(() => {
    localStorage.removeItem('restaurant_access_token');
    localStorage.removeItem('restaurant_refresh_token');
    localStorage.removeItem("restaurant_reg_id");
    setIsLoggedIn(false);
    navigate('/restaurant-login');
  }, [navigate]);

  const [restaurantData, setRestaurantData] = useState([]);

  // Restaurant Details Handler: Fetch Restaurant Details
  const fetchRestaurantDetails = () => {
    const restaurant_id = localStorage.getItem('restaurant_reg_id');
    RestaurantApi.get(`details/${restaurant_id}/`)
    .then(response => {
      setRestaurantData(response.data);
    })
    .catch(error => {
      console.error("There was an error fetching the restaurant data!", error);
    });
  };

const sendWelcomeEmail = (owner_name, res_name, to_email) => {
  const templateParams = {
    owner_name: owner_name,
    res_name: res_name,
    to_email: to_email,
  };

  // 🔑 return the Promise so .then()/.catch() works in handleSubmit
  return emailjs.send(
    process.env.REACT_APP_EMAIL_JS_SERVICE_ID,
    process.env.REACT_APP_WELCOME_RESTAURANT_TEMPLATE_ID,
    templateParams,
    process.env.REACT_APP_EMAIL_JS_PUBLIC_KEY
  )
  .then((response) => {
    console.log("✅ Email sent successfully!", response.status, response.text);
    return response; // pass result forward
  })
  .catch((error) => {
    console.error("❌ Failed to send email:", error);
    throw error; // so handleSubmit can catch it
  });
};


  useEffect(() => {
    if (isLoggedIn) {
      fetchRestaurantDetails();
    }
    if (!isLoggedIn) {
      setRestaurantData([]);
    }
  }, [isLoggedIn]);

  return (
    <ResturantContext.Provider value={{ isLoggedIn, login, logout, restaurantData, fetchRestaurantDetails, sendWelcomeEmail }}>
      {props.children}
    </ResturantContext.Provider>
  );
};

export default RestaurantState;
