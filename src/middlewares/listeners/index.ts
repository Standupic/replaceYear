import { createListenerMiddleware } from '@reduxjs/toolkit';
import initReplaceYear from '../initReplaceYear';
import getHelperList from '../getHelperList';
import { checkIsThereMoreThanOneNotSelectableYear } from '../../helpers';
import { ACCESS_APPLICATION, setAccessToApplication } from '../../store/globalStateSlice';
import { RootState } from '../../store';
import getStatement from '../getStatement';

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

listenerMiddleware.startListening({
  type: 'formStatement/fulfilled',
  effect: async (action: any, api) => {
    if (!action.payload.anotherEmployer) {
      api.dispatch(getStatement(action.payload.Id));
    }
  },
});

export default listenerMiddleware;
