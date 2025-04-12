import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type SelectedFilter = {
  value: string;
  name: string;
};
interface State {
  currency: SelectedFilter;
  beneficiaryStatus: SelectedFilter;
  tranStatus: SelectedFilter;
}

const initialState: State = {
  currency: { value: '', name: '' },
  beneficiaryStatus: { value: '', name: '' },
  tranStatus: { value: '', name: '' },
};

const userFlowSlice = createSlice({
  name: 'userFlowSlice',
  initialState,
  reducers: {
    setCurrencyFilter: (state, action: PayloadAction<SelectedFilter>) => {
      state.currency = action.payload;
    },
    setTranStatusFilter: (state, action: PayloadAction<SelectedFilter>) => {
      state.tranStatus = action.payload;
    },
    setBeneficiaryStatusFilter: (state, action: PayloadAction<SelectedFilter>) => {
      state.beneficiaryStatus = action.payload;
    },
  },
});

export const { setCurrencyFilter, setTranStatusFilter, setBeneficiaryStatusFilter } =
  userFlowSlice.actions;
export const userFlowReducer = userFlowSlice.reducer;
