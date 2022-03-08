import axios, { AxiosRequestConfig } from 'axios';

const http = axios.create({
  baseURL: process.env.APP_ENV === 'production' ? 'https://api.bybit.com' : 'https://api-testnet.bybit.com',
});

export default http;
