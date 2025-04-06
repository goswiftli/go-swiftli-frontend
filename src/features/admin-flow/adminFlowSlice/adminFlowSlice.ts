import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type SelectedFilter = {
  value: string;
  name: string;
};
interface State {
  totalTranFilter: SelectedFilter;
  totalRevenueFilter: SelectedFilter;
  noOfActiveUsersFilter: SelectedFilter;
}

const initialState: State = {
  totalTranFilter: { value: '', name: '' },
  totalRevenueFilter: { value: '', name: '' },
  noOfActiveUsersFilter: { value: '', name: '' },
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
  },
});

export const { setTotalTranFilter, setTotalRevenueFilter, setNoOfActiveUsersFilter } =
  adminFlowSlice.actions;
export const adminFlowReducer = adminFlowSlice.reducer;
