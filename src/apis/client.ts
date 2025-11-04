import { CLIENT_SIDE_URL } from '@/constants';
import axios from 'axios';
import { getCookie } from 'cookies-next';

// import { preventClientMultipleRefreshToken } from './preventClientMultipleRefreshToken';

const axiosInstance = axios.create({
  baseURL: CLIENT_SIDE_URL,
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = getCookie('accessToken');
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// preventClientMultipleRefreshToken(axiosInstance, CLIENT_SIDE_URL);

export const client = {
  get: async <Response = unknown>(...args: Parameters<typeof axiosInstance.get>) => {
    const response = await axiosInstance.get<Response>(...args);
    return response.data;
  },
  post: async <Request = unknown, Response = unknown>(...args: Parameters<typeof axiosInstance.post>) => {
    const response = await axiosInstance.post<Request, Response>(...args);
    return response;
  },
  put: async <Request = unknown, Response = unknown>(...args: Parameters<typeof axiosInstance.put>) => {
    const response = await axiosInstance.put<Request, Response>(...args);
    return response;
  },
  patch: async <Request = unknown, Response = unknown>(...args: Parameters<typeof axiosInstance.patch>) => {
    const response = await axiosInstance.patch<Request, Response>(...args);
    return response;
  },
  delete: async <Response = unknown>(...args: Parameters<typeof axiosInstance.delete>) => {
    const response = await axiosInstance.delete<Response>(...args);
    return response.data;
  },
};
