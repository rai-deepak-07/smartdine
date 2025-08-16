import axios from 'axios';

// API url Using environment variables for configuration
const API_BASE_URL = process.env.REACT_APP_RAI_API;

const ApiService = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Token ${process.env.REACT_APP_RAI_API_TOKEN}`,
  },
});

export default ApiService;