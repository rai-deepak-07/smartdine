import axios from 'axios';

// Use correct env variable names
const API_BASE_URL = `${process.env.REACT_APP_BASE_API}user`;
const token = localStorage.getItem('user_access_token');

const UserApi = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000,
   headers: {
      Authorization: `Bearer ${token}`,
    }
});

export default UserApi;