import { env } from '@/config';

export const url = {
  kycSetup: env.API_BASE_URL + '/kyc/create',
  getKyc: env.API_BASE_URL + '/kyc',
  beneficiary: env.API_BASE_URL + '/beneficiary',
  approveKyc: env.API_BASE_URL + '/admin/user/approve-kyc',
};

export const queryKey = {
  all: ['all'],
  getKyc: () => [...queryKey.all, 'get-kyc'],
  getBeneficiary: () => [...queryKey.all, 'beneficiary'],
  getBeneficiaryDetails: () => [...queryKey.all, 'beneficiary-details'],
};
