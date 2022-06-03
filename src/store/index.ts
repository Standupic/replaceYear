import { configureStore } from '@reduxjs/toolkit';
import listenerMiddleware from '../middlewares/listeners';
import userSlice from './userSlice';
import globalStateSlice from './globalStateSlice';
import calculatorSlice from './calculatorSlice';
import applicationsSlice from './applicationsSlice';

export const store = configureStore({
  reducer: {
    globalState: globalStateSlice,
    user: userSlice,
    calculator: calculatorSlice,
    applications: applicationsSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(listenerMiddleware.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
