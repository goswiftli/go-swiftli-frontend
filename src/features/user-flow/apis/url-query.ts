import { env } from '@/config';

export const url = {
  kycSetup: env.API_BASE_URL + '/kyc/create',
  getKyc: env.API_BASE_URL + '/kyc',
  beneficiary: env.API_BASE_URL + '/beneficiary',
  adminBeneficiary: env.API_BASE_URL + '/admin/beneficiaries',
  approveKyc: env.API_BASE_URL + '/admin/user/approve-kyc',
  getTransactions: env.API_BASE_URL + '/transactions',
  getAdminTransactions: env.API_BASE_URL + '/admin/transactions',
  convertFund: env.API_BASE_URL + '/fx/convert',
  getAccountBalance: env.API_BASE_URL + '/balance',
};

export const queryKey = {
  all: ['all'],
  getKyc: () => [...queryKey.all, 'get-kyc'],
  getBeneficiary: () => [...queryKey.all, 'beneficiary'],
  getBeneficiaryDetails: () => [...queryKey.all, 'beneficiary-details'],
  getTransactions: () => [...queryKey.all, 'transactions'],
  getAccountBalance: () => [...queryKey.all, 'account-balance'],
};
