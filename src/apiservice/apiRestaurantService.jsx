import axios from 'axios';

// Base URL for restaurant APIs (adjust if needed)
const REST_API_URL = `${process.env.REACT_APP_BASE_API}restaurant/`;

// Token management helpers
const getRestaurantToken = () => localStorage.getItem('restaurant_access_token');
const setRestaurantToken = (token) => localStorage.setItem('restaurant_access_token', token);
const getRefreshToken = () => localStorage.getItem('restaurant_refresh_token');
const removeTokens = () => {
  localStorage.removeItem('restaurant_access_token');
  localStorage.removeItem('restaurant_refresh_token');
  localStorage.removeItem('restaurant_res_reg_id');
};

// Axios instance just for token refresh (to avoid interceptor loops)
const refreshInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_API,
  timeout: 5000,
});

// Main Axios instance for API calls
const apiRestaurantService = axios.create({
  baseURL: REST_API_URL,
  timeout: 5000,
});

// Attach access token to all requests automatically
apiRestaurantService.interceptors.request.use(
  (config) => {
    const token = getRestaurantToken();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle 401 responses by refreshing token and retrying the request
apiRestaurantService.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = getRefreshToken();
      if (!refreshToken) {
        removeTokens();
        window.location.href = '/restaurant-login';
        return Promise.reject(error);
      }

      try {
        const refreshResponse = await refreshInstance.post('token/refresh/', {
          refresh: refreshToken,
        });
        const { access } = refreshResponse.data;

        // Save new access token
        setRestaurantToken(access);

        // Update original request and retry
        originalRequest.headers['Authorization'] = `Bearer ${access}`;
        return apiRestaurantService(originalRequest);
      } catch (refreshError) {
        removeTokens();
        window.location.href = '/restaurant-login';
        return Promise.reject(refreshError);
      }
    }

    // Reject any other errors
    return Promise.reject(error);
  }
);

export default apiRestaurantService;
