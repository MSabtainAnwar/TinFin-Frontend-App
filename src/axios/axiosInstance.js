import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://10.0.2.2:8000', 
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const token = 'your-auth-token'; 
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
