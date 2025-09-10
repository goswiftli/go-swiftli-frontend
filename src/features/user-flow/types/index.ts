import { CONSTANTS } from '@/constants';

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

export type FileDetails = {
  type: IdType;
  name: string;
  size: number;
  file: File;
};
export type IdType = CONSTANTS.ID_CARD | CONSTANTS.DECLINED | CONSTANTS.PASSPORT;
export type KycStatus = CONSTANTS.PENDING | CONSTANTS.APPROVED | CONSTANTS.REJECTED;
export type IdentificationInfo = {
  country: string;
  fileDetails: FileDetails;
};

export type KycDTO = {
  firstName: string;
  lastName: string;
  email: string;
  idVerification: IdentificationInfo;
  profilePicture: File;
  kycStatus?: KycStatus;
  comment?: string;
};

export type ApproveKyc = {
  userId: number;
  comment: string;
  approved: boolean;
};
export type KycInfo = {
  comment: string;
  idVerificationCountry: string;
  idVerificationType: IdType;
  profilePicture?: string;
  kycStatus?: KycStatus;
  idVerificationFile?: string;
} & PersonalInfo;

export type BankingInformationDTO = {
  currency: string;
  accountType: string;
  accountName: string;
  achRoutingNumber: string;
  bankName: string;
  accountNumber: string;
};

export type BeneficiaryAddressDTO = {
  country: string;
  streetAddress: string;
  state: string;
  city: string;
  postalCode: string;
};

export type BeneficiaryDTO = {
  paymentMethod?: PaymentType;
  bankInformation?: BankingInformationDTO;
  beneficiaryAddress?: BeneficiaryAddressDTO;
};

export type CreateBeneficiaryDTO = {
  name: string;
  accountNumber: string;
  bankName: string;
};

export type BeneficiaryListDTO = {
  userId: number;
  beneficiaries: CreateBeneficiaryDTO[];
};

export type TransactionsDTO = {
  amount: number;
  reference: string;
  paymentMethod: string;
  date: string;
  transactionStatus: string;
};
export type PaymentType = CONSTANTS.CARD_PAYMENT | CONSTANTS.BANK_TRANSFER;

export type AccountBalance = {
  accountBalance: {
    accountBalance: number;
    currency: string;
  }[];
};
