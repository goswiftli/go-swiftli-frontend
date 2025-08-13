import { env } from '@/config';

export const url = {
  getCountries: 'https://restcountries.com/v3.1/all',
  payment: env.API_BASE_URL + '/payments',
  paymentReference: env.API_BASE_URL + '/payments/status',
};
