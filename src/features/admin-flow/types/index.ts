import { AccountStatus, CONSTANTS } from '@/constants';
import { KycInfo } from '@/features/user-flow';

export const transactionStatus = [
  CONSTANTS.SUCCESSFUL,
  CONSTANTS.PENDING,
  CONSTANTS.FAILED,
  CONSTANTS.REFUNDED,
] as const;
export type TransactionStatus = (typeof transactionStatus)[number];

export const requestStatus = [CONSTANTS.APPROVED, CONSTANTS.DECLINED, CONSTANTS.REFUNDED] as const;
export type RequestStatus = (typeof requestStatus)[number];

export const beneficiaryStatus = [CONSTANTS.ACTIVE, CONSTANTS.BLACKLISTED] as const;
export type BeneficiaryStatus = (typeof beneficiaryStatus)[number];

export type UserDTO = {
  id: number;
  username: string;
  email: string;
  phoneNumber: string;
  kyc: KycInfo;
  // accountStatus: AccountStatus;
};

export type TransactionDTO = {
  id: string;
  name: string;
  amount: number;
  paymentType: string;
  status: TransactionStatus;
  date: string;
};

export type RefundRequestDTO = {
  transactionId: number;
  name: string;
  amount: number;
  reason: string;
  status: RequestStatus;
};

export type BeneficiaryDTO = {
  name: string;
  accountNumber: string;
  bankName: string;
  status: BeneficiaryStatus;
  date: string;
};
