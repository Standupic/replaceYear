import { configureStore, createListenerMiddleware } from '@reduxjs/toolkit';
import initReplaceYear from '../middlewares/initReplaceYear';
import getHelperList from '../middlewares/getHelperList';
import { checkIsThereMoreThanOneNotSelectableYear } from '../helpers';
import userSlice from './userSlice';
import globalStateSlice, { ACCESS_APPLICATION, setAccessToApplication } from './globalStateSlice';
import calculatorSlice, { IHelperList } from './calculatorSlice';

const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
  type: 'authorization/fulfilled',
  effect: async (_action, api) => {
    api.dispatch(initReplaceYear({}));
  },
});

listenerMiddleware.startListening({
  type: 'initReplaceYear/fulfilled',
  effect: async (_action, api) => {
    api.dispatch(getHelperList({}));
  },
});

listenerMiddleware.startListening({
  type: 'helperList/fulfilled',
  effect: async (action: any, api) => {
    const store = api.getState() as RootState;
    const twoPreviousYears = {
      previousYear: store.calculator.previousYear,
      beforePreviousYear: store.calculator.beforePreviousYear,
    };
    if (checkIsThereMoreThanOneNotSelectableYear(action.payload, twoPreviousYears).length >= 2) {
      new Error('Пришло 2 недоступных года');
      api.dispatch(setAccessToApplication(ACCESS_APPLICATION.dataWrong));
    }
    if (action.payload.length < 3) {
      new Error('Пришло всего 2 года');
      api.dispatch(setAccessToApplication(ACCESS_APPLICATION.dataWrong));
    }
  },
});

export const store = configureStore({
  reducer: {
    globalState: globalStateSlice,
    user: userSlice,
    calculator: calculatorSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(listenerMiddleware.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
