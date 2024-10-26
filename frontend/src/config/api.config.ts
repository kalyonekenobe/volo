import axios, { HttpStatusCode } from 'axios';

export const getBackendUrl = () => {
  const backendUri = import.meta.env.VITE_BACKEND_URI || 'http://localhost';
  const backendApiPrefix = import.meta.env.VITE_BACKEND_PREFIX || 'api/v1/';

  return `${backendUri}/${backendApiPrefix}`;
};
// Create a custom axios instance
export const api = axios.create({
  baseURL: getBackendUrl(),
  withCredentials: true,
});

// Create a reserve api instance to avoid infinite loops when calling api inside interceptors
export const reserveApiInstance = axios.create({
  baseURL: getBackendUrl(),
  withCredentials: true,
});

// Use request interceptors
api.interceptors.request.use(
  async config => config,
  async error => Promise.reject(error),
);

// User response interceptors
api.interceptors.response.use(
  async response => response,
  async error => {
    const originalRequest = error.config;

    // If user is unauthorized to request the data
    if (error.response.status === HttpStatusCode.Unauthorized && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Try to refresh the pair of access and refresh JWT tokens
        await reserveApiInstance.post(`auth/refresh`);

        return axios(originalRequest);
      } catch (refreshError) {
        // If cannot refresh the pair of tokens then logout
        await reserveApiInstance.post(`auth/logout`);

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);
