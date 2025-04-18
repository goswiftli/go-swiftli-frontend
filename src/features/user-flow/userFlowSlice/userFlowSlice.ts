import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { getDataFromSessStorage } from '@/utils';

import { IdentificationInfo, PersonalInfo } from '../types';

type SelectedFilter = {
  value: string;
  name: string;
};

interface State {
  currency: SelectedFilter;
  beneficiaryStatus: SelectedFilter;
  tranStatus: SelectedFilter;
  personalInfo: PersonalInfo;
  identification: IdentificationInfo;
  profilePicture: File | null;
}

const initialState: State = {
  currency: { value: '', name: '' },
  beneficiaryStatus: { value: '', name: '' },
  tranStatus: { value: '', name: '' },
  personalInfo: getDataFromSessStorage('kyc-per-info') || ({} as PersonalInfo),
  identification: {} as IdentificationInfo,
  profilePicture: null,
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
    setPersonalInfo: (state, action: PayloadAction<PersonalInfo>) => {
      state.personalInfo = action.payload;
    },
    setIdentificationInfo: (state, action: PayloadAction<IdentificationInfo>) => {
      state.identification = action.payload;
    },
    setProfilePicture: (state, action: PayloadAction<File>) => {
      state.profilePicture = action.payload;
    },
  },
});

export const {
  setCurrencyFilter,
  setTranStatusFilter,
  setBeneficiaryStatusFilter,
  setPersonalInfo,
  setIdentificationInfo,
  setProfilePicture,
} = userFlowSlice.actions;
export const userFlowReducer = userFlowSlice.reducer;
