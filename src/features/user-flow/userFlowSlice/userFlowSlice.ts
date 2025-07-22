import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { logout } from '@/features/auth';
import { getDataFromSessStorage } from '@/utils';

import { BeneficiaryDTO, IdentificationInfo, PersonalInfo } from '../types';

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
  beneficiaryInformation: BeneficiaryDTO;
}

const initialState: State = {
  currency: { value: '', name: '' },
  beneficiaryStatus: { value: '', name: '' },
  tranStatus: { value: '', name: '' },
  personalInfo: getDataFromSessStorage('kyc-per-info') || ({} as PersonalInfo),
  identification: getDataFromSessStorage('identification-details') || ({} as IdentificationInfo),
  profilePicture: null,
  beneficiaryInformation: getDataFromSessStorage('beneficiary-info') || ({} as BeneficiaryDTO),
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
    setBeneficiaryInformation: (state, action: PayloadAction<BeneficiaryDTO>) => {
      state.beneficiaryInformation = {
        ...state.beneficiaryInformation,
        ...action.payload,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logout, (state) => {
      state.identification = {} as IdentificationInfo;
    });
  },
});

export const {
  setCurrencyFilter,
  setTranStatusFilter,
  setBeneficiaryStatusFilter,
  setPersonalInfo,
  setIdentificationInfo,
  setProfilePicture,
  setBeneficiaryInformation,
} = userFlowSlice.actions;
export const userFlowReducer = userFlowSlice.reducer;
