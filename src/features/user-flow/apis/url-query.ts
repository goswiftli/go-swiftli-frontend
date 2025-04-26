import { env } from '@/config';

export const url = {
  kycSetup: env.API_BASE_URL + '/kyc/create',
};

export const queryKey = {
  all: ['kyc'],
  getKyc: () => [...queryKey.all, 'get-kyc'],
};
