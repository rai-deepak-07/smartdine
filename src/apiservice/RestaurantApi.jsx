// RestaurantApi.js
import axios from 'axios';

const API_BASE_URL = `${process.env.REACT_APP_BASE_API}restaurant`;

const RestaurantApi = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000,
});

// Always attach latest token from localStorage
RestaurantApi.interceptors.request.use((config) => {
  const token = localStorage.getItem('restaurant_access_token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

export default RestaurantApi;
