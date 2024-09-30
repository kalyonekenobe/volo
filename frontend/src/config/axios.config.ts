import axios, { HttpStatusCode } from 'axios';
import cookies from 'js-cookie';

(axios.defaults.baseURL = `${import.meta.env.VITE_BACKEND_URI}/${
  import.meta.env.VITE_BACKEND_PREFIX || 'api/v1/'
}`),
  (axios.defaults.withCredentials = true);

const reserveAxiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URI}/${
    import.meta.env.VITE_BACKEND_PREFIX || 'api/v1/'
  }`,
  withCredentials: true,
});

axios.interceptors.request.use(
  async config => config,
  async error => Promise.reject(error),
);

axios.interceptors.response.use(
  async response => response,
  async error => {
    const originalRequest = error.config;

    if (error.response.status === HttpStatusCode.Unauthorized && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        await reserveAxiosInstance.post(`auth/refresh`, {
          headers: {
            Cookie: cookies.toString(),
          },
        });

        return axios(originalRequest);
      } catch (refreshError) {
        await reserveAxiosInstance.post(`auth/logout`, {
          headers: {
            Cookie: cookies.toString(),
          },
        });

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);
