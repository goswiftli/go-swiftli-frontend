import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { clearStorageValues, getDataFromSessStorage } from '@/utils';

import { User } from '../types';

interface AuthState {
  token: string | null;
  authUser: User;
}

const initialState: AuthState = {
  token: getDataFromSessStorage('token') || null,
  authUser: getDataFromSessStorage('auth_user') || ({} as User),
};

export const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      state.authUser = {} as User;
      clearStorageValues();
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    setAuthUser: (state, action: PayloadAction<User>) => {
      state.authUser = action.payload;
    },
  },
});

export const { logout, setAuthUser, setToken } = authSlice.actions;
export const authReducer = authSlice.reducer;
