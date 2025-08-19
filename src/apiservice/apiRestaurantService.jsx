import axios from 'axios';


const REST_API_URL = `${process.env.REACT_APP_BASE_API}restaurant/`;
// const REST_API_BASE_URL = 'http://127.0.0.1:8000/api/smartdine/restaurant/';
// const REST_API_URL = 'http://10.166.156.122:8000/api/smartdine/restaurant/';

const getRestaurantToken = () => {
  return localStorage.getItem('restaurant_access_token');
};

const setRestaurantToken = (token) => {
  return localStorage.setItem('restaurant_access_token',token);
};

const apiRestaurantService = axios.create({
  baseURL: REST_API_URL,
  timeout: 5000,
});

apiRestaurantService.interceptors.request.use((config) => {
    const token = getRestaurantToken();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiRestaurantService.interceptors.response.use((response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    const refreshToken = localStorage.getItem('restaurant_refresh_token');

    if (error.response.status === 401 && !originalRequest._retry && refreshToken) {
      originalRequest._retry = true;
      try {
        const refreshResponse = await apiRestaurantService.post('/api/token/refresh/', { refresh: refreshToken });
        const { access } = refreshResponse.data;
        console.log("Refresh Access Token:", refreshResponse);
        setRestaurantToken(access);
        originalRequest.headers['Authorization'] = `Bearer ${access}`;
        return apiRestaurantService(originalRequest);
      } catch (refreshError) {
        console.error('Token refresh failed:', refreshError);
        // Handle logout or any other error handling here.
      }
    }

    return Promise.reject(error);
  }
);

export default apiRestaurantService;