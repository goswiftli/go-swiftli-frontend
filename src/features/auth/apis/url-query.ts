import { env } from '@/config';

export const url = {
  signup: env.API_BASE_URL + '/auth/signup',
  login: env.API_BASE_URL + '/auth/login',
  verifyEmail: env.API_BASE_URL + '/auth/confirm-account',
  forgotPassword: env.API_BASE_URL + '/auth/request-password-reset',
};
