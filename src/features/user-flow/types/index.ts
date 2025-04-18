import { CONSTANTS } from '@/constants';

export type UserTransactionDTO = {
  amount: number;
  transactionId: number;
  method: string;
  date: string;
  status: string;
};

export type UserBeneficiaryDTO = {
  name: string;
  accountNumber: string;
  method: string;
  date: string;
  status: string;
};
export type PersonalInfo = {
  firstName: string;
  lastName: string;
  email: string;
};

export type IdType = CONSTANTS.ID_CARD | CONSTANTS.DECLINED | CONSTANTS.PASSPORT;
export type IdentificationInfo = {
  country: string;
  fileDetails: {
    type: IdType;
    name: string;
    size: number;
  };
};

export type KycDTO = {
  firstName: string;
  lastName: string;
  email: string;
  idVerification: IdentificationInfo;
  profilePicture: File;
  kycStatus: CONSTANTS.PENDING | CONSTANTS.APPROVED | CONSTANTS.REJECTED;
  comment?: string;
};
