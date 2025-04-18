export enum LINKS {
  HOME = '/',
  HOW_IT_WORKS = '/how-it-works',
  FAQ = '/faq',
  LOGIN = '/login',
  CREATE_ACCOUNT = '/create-account',
  VERIFY_EMAIL = '/verify-email',
  FORGOT_PASSWORD = '/forgot-password',
  DASHBOARD = 'dashboard',
  OVERVIEW = '/overview',
  USER_MANAGEMENT = '/user-management',
  TRANSACTIONS = '/transactions',
  BENEFICIARIES = '/beneficiaries',
  EXCHANGE_MANAGEMENT = '/exchange-management',
  REPORT_ANALYSIS = '/report-analysis',
  CUSTOMER_SUPPORT = '/customer-support',
  SECURITY_COMPLIANCE = '/security-compliance',
  ROLE_MANAGEMENT = 'role-management',
  USER_DETAILS = 'user-details',
  PAYMENT = '/payment',
  COMPLETE_KYC = 'complete-kyc',
  WITHDRAW = 'withdraw',
  CONVERT_FUNDS = 'convert-funds',
  DEPOSIT = 'deposit',
  MAKE_PAYMENT = 'make-payment',
}

export enum CONSTANTS {
  MONTHLY = 'MONTHLY',
  WEEKLY = 'WEEKLY',
  DAILY = 'DAILY',
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  ACTIVE = 'ACTIVE',
  SUSPENDED = 'SUSPENDED',
  SUCCESSFUL = 'SUCCESSFUL',
  FAILED = 'FAILED',
  REFUNDED = 'REFUNDED',
  DECLINED = 'DECLINED',
  BLACKLISTED = 'BLACKLISTED',
  ID_CARD = 'ID_CARD',
  DRIVING_LICENSE = 'DRIVING_LICENSE',
  PASSPORT = 'PASSPORT',
}

export const kycStatus = [CONSTANTS.PENDING, CONSTANTS.APPROVED, CONSTANTS.REJECTED] as const;
export type KycStatus = (typeof kycStatus)[number];

export const accountStatus = [CONSTANTS.ACTIVE, CONSTANTS.SUSPENDED];
export type AccountStatus = (typeof accountStatus)[number];
