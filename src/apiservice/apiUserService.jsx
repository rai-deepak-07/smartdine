import axios from 'axios';

// Base URL for user APIs, from env variable
const USER_API_URL = `${process.env.REACT_APP_BASE_API}user/`;

// Token helpers for user
const getUserToken = () => localStorage.getItem('user_access_token');
const setUserToken = (token) => localStorage.setItem('user_access_token', token);
const getUserRefreshToken = () => localStorage.getItem('user_refresh_token');
const removeUserTokens = () => {
  localStorage.removeItem('user_access_token');
  localStorage.removeItem('user_refresh_token');
  // remove any additional user-related tokens/data here
};

// Axios instance for refresh token calls without interceptors to avoid recursion
const refreshInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_API,
  timeout: 5000,
});

// Main Axios instance for user API calls
const apiUserService = axios.create({
  baseURL: USER_API_URL,
  timeout: 5000,
});

// Attach access token to every request
apiUserService.interceptors.request.use(
  (config) => {
    const token = getUserToken();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle 401 errors by refreshing token and retrying original request
apiUserService.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = getUserRefreshToken();

      if (!refreshToken) {
        removeUserTokens();
        window.location.href = '/user-login'; // redirect user to login (adjust path)
        return Promise.reject(error);
      }

      try {
        // Use the exact refresh token endpoint full URL or from env
         const refreshResponse = await refreshInstance.post('token/refresh/', {
          refresh: refreshToken,
        });

        const { access } = refreshResponse.data;
        setUserToken(access);

        // Retry original request with new token
        originalRequest.headers['Authorization'] = `Bearer ${access}`;
        return apiUserService(originalRequest);
      } catch (refreshError) {
        removeUserTokens();
        window.location.href = '/user-login'; // redirect user on failure
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default apiUserService;
