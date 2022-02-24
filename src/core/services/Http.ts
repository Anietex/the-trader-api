import axios, { AxiosRequestConfig } from 'axios';

const http = axios.create({
  baseURL: 'https://api-testnet.bybit.com',
});

export default http;
