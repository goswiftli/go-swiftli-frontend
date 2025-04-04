import { InternalAxiosRequestConfig } from 'axios';

import { getDataFromSessStorage } from '@/utils';

export const rejectErrorInterceptor = (error: any) => {
  return Promise.reject(error);
};

export const authRequestInterceptor = (config: InternalAxiosRequestConfig) => {
  const token = getDataFromSessStorage('token');

  if (token) {
    config.headers.authorization = `Bearer ${token}`;
  }
  config.headers.Accept = 'application/json';
  return config;
};
