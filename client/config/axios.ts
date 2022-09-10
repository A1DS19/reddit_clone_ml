import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL:
    process.env.NODE_ENV === 'development'
      ? process.env.NEXT_PUBLIC_SERVER_URL
      : process.env.NEXT_PUBLIC_PROD_SERVER_URL,
  withCredentials: true,
});
