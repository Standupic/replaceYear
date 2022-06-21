import { createListenerMiddleware, isAnyOf, isFulfilled } from '@reduxjs/toolkit';
import initReplaceYear from '../initReplaceYear';
import getHelperList from '../getHelperList';
import submitStatement from '../submitStatement';
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
import deleteDraft from '../deleteDraft';
import formStatement from '../formStatement';
import editDraftStatement from '../editDraft';
import getEditedDraftStatement from '../getEditedDraftStatement';
import getApplication from '../getApplication';
import { toggleDraftSinged, toggleDraftToFormStatement } from '../../store/draftSlice';

const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
  type: 'authorization/fulfilled',
  effect: async (_action, api) => {
    api.dispatch(initReplaceYear({}));
  },
});

listenerMiddleware.startListening({
  type: 'initReplaceYear/fulfilled',
  effect: async (_action: any, api) => {
    api.dispatch(getHelperList({}));
    console.log('helper list');
    api.unsubscribe();
  },
});

listenerMiddleware.startListening({
  matcher: isFulfilled(getHelperList),
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
  matcher: isFulfilled(formStatement),
  effect: async (action: any, api) => {
    api.dispatch(toggleIsVisibleFormStatement(false));
    if (!action.payload.anotherEmployer) {
      api.dispatch(getStatement(action.payload.Id));
    }
  },
});

listenerMiddleware.startListening({
  matcher: isFulfilled(editDraftStatement),
  effect: async (action: any, api) => {
    api.dispatch(getEditedDraftStatement(action.payload.Id));
  },
});

listenerMiddleware.startListening({
  matcher: isAnyOf(toMostBenefit, incrementYear, decrementYear, cancelSign),
  effect: async (_action: any, api) => {
    const store = api.getState() as RootState;
    const { attachmentId } = store.globalState;
    const { attachmentDraftId } = store.draft;
    if (attachmentId) {
      api.dispatch(toggleIsVisibleFormStatement(true));
    }
    if (attachmentDraftId) {
      api.dispatch(toggleDraftToFormStatement(true));
      api.dispatch(toggleDraftSinged(false));
    }
  },
});

listenerMiddleware.startListening({
  matcher: isFulfilled(getApplication),
  effect: async (action: any, api) => {
    const store = api.getState() as RootState;
    if (action.meta.arg.isDraft) {
      api.dispatch(computingDraftApplication(store.draft.currentDraft));
    }
  },
});

listenerMiddleware.startListening({
  matcher: isAnyOf(isFulfilled(submitStatement), isFulfilled(deleteDraft)),
  effect: async (_action, api) => {
    api.dispatch(initReplaceYear({}));
  },
});

export default listenerMiddleware;
