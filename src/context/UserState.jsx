import React, { useEffect, useState } from 'react';
import { UserContext } from './Context';
import { useCallback } from 'react';
import { jwtDecode } from 'jwt-decode';

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
      if (city) {
        setLocation(city.long_name.split(" ")[0]);
        fetchLocalRestaurants(city.long_name.split(" ")[0]);
      }
    })
      .catch(error => {
        console.error("error :", error);
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

  const [restaurantData, setRestaurantData] = useState([]);
  // Restaurant Details Handler: Fetch Restaurant Details
  const fetchRestaurantDetails = (restaurant_id) => {
    UserApi.get(`restaurant/details/${restaurant_id}/`)
      .then(response => {
        setRestaurantData(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the restaurant data!", error);
      });
  };


  const [restaurantTables, setRestaurantTables] = useState([]);

// Fetch restaurant tables with proper error handling
const fetchRestaurantTables = (restaurant_id) => {
  if (!restaurant_id) {
    console.error("No restaurant ID provided");
    setRestaurantTables([]);
    return;
  }

  // Clean the ID (remove trailing slashes, trim whitespace)
  const cleanId = String(restaurant_id).trim().replace(/\/$/, '');
  
  console.log('Fetching tables for restaurant:', cleanId);
  
  UserApi.get(`management/tables/?restaurant=${cleanId}`)
    .then(response => {
      console.log('Tables fetched:', response.data);
      setRestaurantTables(response.data);
    })
    .catch(error => {
      console.error("Error fetching tables:", error);
      console.error("Error response:", error.response?.data);
      setRestaurantTables([]); // Reset to empty array on error
    });
};

// Fetch bookings with proper error handling
const fetchBookingsForDateTime = async (restaurantId, date, time = null) => {
  try {
    if (!restaurantId || !date) {
      console.error("Missing required parameters");
      return [];
    }

    // Clean the ID
    const cleanId = String(restaurantId).trim().replace(/\/$/, '');
    
    // Build URL based on whether time is provided
    let url = `management/table-bookings/?restaurant=${cleanId}&booking_date=${date}`;
    
    // Only add time filter if explicitly provided
    if (time) {
      url += `&booking_time=${time}`;
    }
    
    console.log('Fetching bookings:', url);
    const response = await UserApi.get(url);
    console.log('Bookings fetched:', response.data);
    
    return response.data;
  } catch (err) {
    console.error("Error fetching bookings:", err);
    console.error("Error response:", err.response?.data);
    return [];
  }
};

// Create a new table booking
const createTableBooking = async (bookingData) => {
  try {
    const response = await UserApi.post('management/table-bookings/', bookingData);
    console.log('Booking created:', response.data);
    return { success: true, data: response.data };
  } catch (error) {
    console.error('Error creating booking:', error);
    console.error('Error response:', error.response?.data);
    return { 
      success: false, 
      error: error.response?.data || 'Failed to create booking' 
    };
  }
};


  useEffect(() => {
    if (isLoggedIn) {
      navigator.geolocation.getCurrentPosition(getLocation);
      fetchUserDetails();
    }

    if (!isLoggedIn) {
      setuserData([]);
      setLocation("");
      setLocalRestaurantData([]);
    }

  }, [isLoggedIn, getLocation]);

  return (
    <UserContext.Provider value={{ isLoggedIn, login, logout, userData, location, localRestaurantData, restaurantData, fetchRestaurantDetails, restaurantTables, fetchRestaurantTables, fetchBookingsForDateTime, createTableBooking}}>
      {props.children}
    </UserContext.Provider>
  )
}

export default UserState;