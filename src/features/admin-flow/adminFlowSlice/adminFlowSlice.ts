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
}

const initialState: State = {
  totalTranFilter: { value: '', name: '' },
  totalRevenueFilter: { value: '', name: '' },
  noOfActiveUsersFilter: { value: '', name: '' },
  kycStatus: { value: '', name: '' },
  accountStatus: { value: '', name: '' },
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
  },
});

export const {
  setTotalTranFilter,
  setKycStatusFilter,
  setTotalRevenueFilter,
  setNoOfActiveUsersFilter,
  setAccountStatusFilter,
} = adminFlowSlice.actions;
export const adminFlowReducer = adminFlowSlice.reducer;
