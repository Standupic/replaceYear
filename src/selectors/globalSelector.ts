import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

export const selectStatusApplication = (state: RootState['globalState']) => state.statusApplication;

export const selectAccessApplication = (state: RootState['globalState']) => state.accessApplication;

export const selectHelperList = (state: RootState) => state.globalState.helperList;

export const totalNotActiveYears = createSelector(selectHelperList, (items) => {
  const currentYear = new Date().getFullYear();
  return items
    .filter((item) => {
      if (item.year === (currentYear - 1).toString()) return item;
      if (item.year === (currentYear - 2).toString()) return item;
    })
    .reduce((acc: any, item) => {
      console.log(item);
      return (acc += item.Amount) / 730;
    }, 0)
    .toFixed(2);
});
