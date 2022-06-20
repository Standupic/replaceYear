import { createListenerMiddleware, isAnyOf, isFulfilled } from '@reduxjs/toolkit';
import initReplaceYear from '../initReplaceYear';
import getHelperList from '../getHelperList';
import { checkIsThereMoreThanOneNotSelectableYear } from '../../helpers';
import {
  ACCESS_APPLICATION,
  cancelSign,
  setAccessToApplication,
  toggleIsVisibleFormStatement,
} from '../../store/globalStateSlice';
import { RootState } from '../../store';
import getStatement from '../getStatement';
import {
  computingDraftApplication,
  decrementYear,
  incrementYear,
  toMostBenefit,
} from '../../store/calculatorSlice';
import authorization from '../authorization';
import formStatement from '../formStatement';
import getApplication from '../getApplication';
import submitStatement from '../submitStatement';
import deleteDraft from '../deleteDraft';

const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
  matcher: isFulfilled(authorization),
  effect: async (_action, api) => {
    api.dispatch(initReplaceYear({}));
  },
});

listenerMiddleware.startListening({
  matcher: isFulfilled(initReplaceYear),
  effect: async (_action, api) => {
    api.dispatch(getHelperList({}));
    api.unsubscribe();
  },
});

listenerMiddleware.startListening({
  matcher: isFulfilled(getHelperList),
  effect: async (action, api) => {
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
  matcher: isFulfilled(formStatement),
  effect: async (action, api) => {
    api.dispatch(toggleIsVisibleFormStatement(false));
    if (!action.payload.anotherEmployer) {
      api.dispatch(getStatement(action.payload.Id));
    }
  },
});

listenerMiddleware.startListening({
  matcher: isAnyOf(toMostBenefit, incrementYear, decrementYear, cancelSign),
  effect: async (_action, api) => {
    const store = api.getState() as RootState;
    const { statementAttachmentId } = store.globalState;
    if (statementAttachmentId) {
      api.dispatch(toggleIsVisibleFormStatement(true));
    }
  },
});

listenerMiddleware.startListening({
  matcher: isFulfilled(getApplication),
  effect: async (action, api) => {
    const store = api.getState() as RootState;
    if (action.meta.arg.isDraft) {
      api.dispatch(computingDraftApplication(store.applications.currentApplication));
    }
  },
});

listenerMiddleware.startListening({
  matcher: isFulfilled(submitStatement),
  effect: async (_action, api) => {
    api.dispatch(initReplaceYear({}));
  },
});

listenerMiddleware.startListening({
  matcher: isFulfilled(deleteDraft),
  effect: async (_action, api) => {
    api.dispatch(initReplaceYear({}));
  },
});

export default listenerMiddleware;
