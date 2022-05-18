import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { getCurrency, isMostBenefitYears } from '../helpers';

export const selectHelperList = (state: RootState) => state.calculator.helperList;
export const selectTopYear = (state: RootState) => state.calculator.topYear;
export const selectBottomYear = (state: RootState) => state.calculator.bottomYear;
export const selectMostBenefit = (state: RootState) => state.calculator.mostBenefitYears;
export const selectPreviousTwoYears = (state: RootState) => state.calculator.previousTwoYears;

export const selectTotalNotActiveYears = createSelector(selectPreviousTwoYears, (items) => {
  return items?.reduce((acc: any, item) => {
    return acc + item.dailyAmount;
  }, 0);
});

export const selectDataActiveYears = createSelector(
  selectTopYear,
  selectBottomYear,
  selectMostBenefit,
  selectHelperList,
  selectTotalNotActiveYears,
  (top, bottom, mostBenefitYears, helperList, totalNotActiveYear) => {
    const total = helperList
      .filter((item) => {
        return item.year === top || item.year === bottom;
      })
      .reduce((acc: any, item) => {
        return acc + item.dailyAmount;
      }, 0);
    const isTheBest = isMostBenefitYears(top, bottom, mostBenefitYears);
    const diff = Number((total - totalNotActiveYear).toFixed(2));
    return {
      total: getCurrency(total),
      isTheBest,
      diff,
    };
  },
);

export const selectIncomeActiveYears = createSelector(
  selectTopYear,
  selectBottomYear,
  selectHelperList,
  (top, bottom, helperList) => {
    const filtered = helperList.filter((item) => item.year === top || item.year === bottom);
    if (filtered && filtered.length === 2) {
      return {
        topYearIncome: filtered[0].Amount,
        bottomYearIncome: filtered[1].Amount,
      };
    }
    return {
      topYearIncome: 0,
      bottomYearIncome: 0,
    };
  },
);
