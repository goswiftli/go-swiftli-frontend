import { CONSTANTS } from '@/constants';

export type PersonalInfo = {
  firstName: string;
  lastName: string;
  email: string;
};

export type SettingsDTO = {
  emailNotification: boolean;
  smsNotification: boolean;
  websiteNotification: boolean;
};
export type PaymentType = CONSTANTS.CARD_PAYMENT | CONSTANTS.BANK_TRANSFER;

export type PersonalDetailsDTO = {
  dateOfBirth: string;
  gender: string;
  maritalStatus: string;
};

export type BusinessDetailsDTO = {
  occupation: string;
  companyName: string;
  jobTitle: string;
};

export type ProfileDTO = PersonalDetailsDTO & BusinessDetailsDTO;
