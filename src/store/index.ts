import { configureStore } from '@reduxjs/toolkit';
import userSlice from './userSlice';
import globalStateSlice from './globalStateSlice';

export const store = configureStore({
  reducer: {
    globalState: globalStateSlice,
    user: userSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
