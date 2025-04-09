import { AccountStatus, KycStatus } from '@/constants';

export type UserDTO = {
  name: string;
  email: string;
  phoneNumber: string;
  kycStatus: KycStatus;
  accountStatus: AccountStatus;
};
