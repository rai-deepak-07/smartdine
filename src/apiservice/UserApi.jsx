import axios from 'axios';

// Use correct env variable names
const API_BASE_URL = `${process.env.REACT_APP_BASE_API}`;

const UserApi = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000,
});

// Always attach latest token from localStorage
UserApi.interceptors.request.use((config) => {
  const token = localStorage.getItem('user_access_token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

export default UserApi;