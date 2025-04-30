import { env } from '@/config';

export const url = {
  kycSetup: env.API_BASE_URL + '/kyc/create',
  getKyc: env.API_BASE_URL + '/kyc',
  setupSettings: env.API_BASE_URL + '/settings/create',
  getSettings: env.API_BASE_URL + '/settings',
  setupProfile: env.API_BASE_URL + '/profiles',
};

export const queryKey = {
  all: ['all'],
  getKyc: () => [...queryKey.all, 'get-kyc'],
  getSettings: () => [...queryKey.all, 'get-settings'],
  getProfile: () => [queryKey.all, 'get-profile'],
};
