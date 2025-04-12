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
