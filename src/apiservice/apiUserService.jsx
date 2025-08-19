import axios from 'axios';

// const USER_API_BASE_URL = 'http://127.0.0.1:8000/api/smartdine/user/';
// const USER_API_BASE_URL = 'http://10.166.156.122:8000/api/smartdine/user/';
const USER_API_URL = `${process.env.REACT_APP_BASE_API}user/`;

const getUserToken = () => {
  return localStorage.getItem('user_access_token');
};

const setUserToken = (token) => {
  return localStorage.setItem('user_access_token',token);
};

const apiUserService = axios.create({
  baseURL: USER_API_URL,
  timeout: 5000,
});

apiUserService.interceptors.request.use((config) => {
    const token = getUserToken();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiUserService.interceptors.response.use((response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    const refreshToken = localStorage.getItem('user_refresh_token');

    if (error.response.status === 401 && !originalRequest._retry && refreshToken) {
      originalRequest._retry = true;
      try {
        const refreshResponse = await apiUserService.post('/api/token/refresh/', { refresh: refreshToken });
        const { access } = refreshResponse.data;
        console.log("Refresh Access Token:", refreshResponse);
        setUserToken(access);
        originalRequest.headers['Authorization'] = `Bearer ${access}`;
        return apiUserService(originalRequest);
      } catch (refreshError) {
        console.error('Token refresh failed:', refreshError);
        // Handle logout or any other error handling here.
      }
    }

    return Promise.reject(error);
  }
);

export default apiUserService;