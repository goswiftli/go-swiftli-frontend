import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type SelectedFilter = {
  value: string;
  name: string;
};
interface State {
  totalTranFilter: SelectedFilter;
  totalRevenueFilter: SelectedFilter;
  noOfActiveUsersFilter: SelectedFilter;
  kycStatus: SelectedFilter;
  accountStatus: SelectedFilter;
  paymentType: SelectedFilter;
  transactionStatus: SelectedFilter;
  transactionDateRange: SelectedFilter;
  refundStatus: SelectedFilter;
  beneficiaryStatus: SelectedFilter;
  beneficiaryDateRange: SelectedFilter;
}

const initialState: State = {
  totalTranFilter: { value: '', name: '' },
  totalRevenueFilter: { value: '', name: '' },
  noOfActiveUsersFilter: { value: '', name: '' },
  kycStatus: { value: '', name: '' },
  accountStatus: { value: '', name: '' },
  paymentType: { value: '', name: '' },
  transactionStatus: { value: '', name: '' },
  transactionDateRange: { value: '', name: '' },
  refundStatus: { value: '', name: '' },
  beneficiaryStatus: { value: '', name: '' },
  beneficiaryDateRange: { value: '', name: '' },
};

export const adminFlowSlice = createSlice({
  name: 'adminFlowSlice',
  initialState,
  reducers: {
    setTotalTranFilter: (state, action: PayloadAction<SelectedFilter>) => {
      state.totalTranFilter = action.payload;
    },
    setTotalRevenueFilter: (state, action: PayloadAction<SelectedFilter>) => {
      state.totalRevenueFilter = action.payload;
    },
    setNoOfActiveUsersFilter: (state, action: PayloadAction<SelectedFilter>) => {
      state.noOfActiveUsersFilter = action.payload;
    },
    setKycStatusFilter: (state, action: PayloadAction<SelectedFilter>) => {
      state.kycStatus = action.payload;
    },
    setAccountStatusFilter: (state, action: PayloadAction<SelectedFilter>) => {
      state.accountStatus = action.payload;
    },
    setPaymentType: (state, action: PayloadAction<SelectedFilter>) => {
      state.paymentType = action.payload;
    },
    setTranStatus: (state, action: PayloadAction<SelectedFilter>) => {
      state.transactionStatus = action.payload;
    },
    setTranDateRange: (state, action: PayloadAction<SelectedFilter>) => {
      state.transactionDateRange = action.payload;
    },
    setRefundStatus: (state, action: PayloadAction<SelectedFilter>) => {
      state.refundStatus = action.payload;
    },
    setBeneficiaryStatus: (state, action: PayloadAction<SelectedFilter>) => {
      state.beneficiaryStatus = action.payload;
    },
    setBeneficiaryDateRange: (state, action: PayloadAction<SelectedFilter>) => {
      state.beneficiaryDateRange = action.payload;
    },
  },
});

export const {
  setTotalTranFilter,
  setKycStatusFilter,
  setTotalRevenueFilter,
  setNoOfActiveUsersFilter,
  setAccountStatusFilter,
  setPaymentType,
  setTranDateRange,
  setTranStatus,
  setRefundStatus,
  setBeneficiaryDateRange,
  setBeneficiaryStatus,
} = adminFlowSlice.actions;
export const adminFlowReducer = adminFlowSlice.reducer;
