import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import listenerMiddleware from '../middlewares/listeners';
import userSlice from './userSlice';
import globalStateSlice from './globalStateSlice';
import calculatorSlice from './calculatorSlice';
import applicationsSlice from './applicationsSlice';
import draft from './draftSlice';

export const store = configureStore({
  reducer: {
    globalState: globalStateSlice,
    user: userSlice,
    calculator: calculatorSlice,
    applications: applicationsSlice,
    draft: draft,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(listenerMiddleware.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
