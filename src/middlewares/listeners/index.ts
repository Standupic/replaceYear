import { createListenerMiddleware, isAnyOf } from '@reduxjs/toolkit';
import initReplaceYear from '../initReplaceYear';
import getHelperList from '../getHelperList';
import { checkIsThereMoreThanOneNotSelectableYear } from '../../helpers';
import {
  ACCESS_APPLICATION,
  cancelSign,
  setAccessToApplication,
  toggleIsVisibleFormStatement,
  toggleToContinue,
} from '../../store/globalStateSlice';
import { RootState } from '../../store';
import getStatement from '../getStatement';
import {
  computingDraftApplication,
  decrementYear,
  incrementYear,
  toMostBenefit,
} from '../../store/calculatorSlice';

const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
  type: 'authorization/fulfilled',
  effect: async (_action, api) => {
    api.dispatch(initReplaceYear({}));
  },
});

listenerMiddleware.startListening({
  type: 'initReplaceYear/fulfilled',
  effect: async (action: any, api) => {
    api.dispatch(getHelperList({}));
    if (!action.payload.message) {
      api.dispatch(toggleToContinue(true));
    } else {
      api.dispatch(toggleToContinue(false));
    }
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
      api.dispatch(setAccessToApplication(ACCESS_APPLICATION.DataWrong));
    }
    if (action.payload.length < 3) {
      new Error('Пришло всего 2 года');
      api.dispatch(setAccessToApplication(ACCESS_APPLICATION.DataWrong));
    }
  },
});

// Взять данные заявление под копотом если подписываем заявление в ручную. Формуруем -> под копотом берем даныые файла.
listenerMiddleware.startListening({
  type: 'formStatement/fulfilled',
  effect: async (action: any, api) => {
    api.dispatch(toggleIsVisibleFormStatement(false));
    if (!action.payload.anotherEmployer) {
      api.dispatch(getStatement(action.payload.Id));
    }
  },
});

listenerMiddleware.startListening({
  matcher: isAnyOf(toMostBenefit, incrementYear, decrementYear, cancelSign),
  effect: async (_action: any, api) => {
    const store = api.getState() as RootState;
    const { statementAttachmentId } = store.globalState;
    if (statementAttachmentId) {
      api.dispatch(toggleIsVisibleFormStatement(true));
    }
  },
});

listenerMiddleware.startListening({
  type: 'getApplication/fulfilled',
  effect: async (action: any, api) => {
    const store = api.getState() as RootState;
    if (action.meta.arg.isDraft) {
      api.dispatch(computingDraftApplication(store.applications.currentApplication));
    }
  },
});

export default listenerMiddleware;
