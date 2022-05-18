import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { isMostBenefitYears } from '../helpers';

export const selectHelperList = (state: RootState) => state.calculator.helperList;
export const selectTopYear = (state: RootState) => state.calculator.topYear;
export const selectBottomYear = (state: RootState) => state.calculator.bottomYear;
export const selectMostBenefit = (state: RootState) => state.calculator.mostBenefitYears;
export const selectPreviousTwoYears = (state: RootState) => state.calculator.previousTwoYears;

export const selectTotalNotActiveYears = createSelector(selectPreviousTwoYears, (items) => {
  return items
    ?.reduce((acc: any, item) => {
      return acc + item.Amount;
    }, 0)
    .getTotal()
    .toFixed(2);
});

export const selectDataActiveYears = createSelector(
  selectTopYear,
  selectBottomYear,
  selectMostBenefit,
  selectHelperList,
  selectTotalNotActiveYears,
  (top, bottom, mostBenefitYears, selectHelperList, totalNotActiveYear) => {
    const total = selectHelperList
      .filter((item) => {
        return item.year === top || item.year === bottom;
      })
      .reduce((acc: any, item) => {
        return acc + item.Amount;
      }, 0)
      .getTotal()
      .toFixed(2);
    const isTheBest = isMostBenefitYears(top, bottom, mostBenefitYears);
    const diff = Number((total - totalNotActiveYear).toFixed(2));
    return {
      total,
      isTheBest,
      diff,
    };
  },
);
