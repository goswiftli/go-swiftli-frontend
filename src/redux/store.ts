import { configureStore } from '@reduxjs/toolkit';

import { adminFlowReducer } from '@/features/admin-flow/adminFlowSlice';
import { authReducer } from '@/features/auth';
import { userFlowReducer } from '@/features/user-flow/userFlowSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    adminFlow: adminFlowReducer,
    userFlow: userFlowReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
