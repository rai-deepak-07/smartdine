import axios from 'axios';

// Use correct env variable names
const API_BASE_URL = process.env.REACT_APP_BASE_API;

const ApiService = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    // Add x-api-key header for authorization
    'x-api-key': process.env.REACT_APP_API_KEY,
  },
});

export default ApiService;