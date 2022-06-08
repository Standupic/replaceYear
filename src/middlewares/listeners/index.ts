import { createListenerMiddleware, isAnyOf } from '@reduxjs/toolkit';
import initReplaceYear from '../initReplaceYear';
import getHelperList from '../getHelperList';
import {
  checkIsThereMoreThanOneNotSelectableYear,
  getDelta,
  totalActiveYears,
  totalNotActiveYears,
} from '../../helpers';
import {
  ACCESS_APPLICATION,
  cancelSign,
  setAccessToApplication,
} from '../../store/globalStateSlice';
import { RootState } from '../../store';
import getStatement from '../getStatement';
import { decrementYear, incrementYear, toMostBenefit } from '../../store/calculatorSlice';
import formStatement from '../formStatement';

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
    const { topActiveYear, bottomActiveYear, helperList, previousTwoYears } = store.calculator;
    const totalActive = totalActiveYears(topActiveYear, bottomActiveYear, helperList);
    const totalNotActive = totalNotActiveYears(previousTwoYears);
    const delta = getDelta(totalActive, totalNotActive);
    if (statementAttachmentId) {
      if (delta > 0) {
        const params = {
          ...store.globalState.paramsStatement,
          NextYear1: topActiveYear.value.toString(),
          NextYear2: bottomActiveYear.value.toString(),
          CurrentAmount: totalActive,
          currency: 'RUB',
          Id: statementAttachmentId,
        };
        api.dispatch(formStatement(params));
      }
    }
  },
});

export default listenerMiddleware;
