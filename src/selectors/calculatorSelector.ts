import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { controllerArrow, getCurrency, isMostBenefitYears } from '../helpers';

export const selectHelperList = (state: RootState) => state.calculator.helperList;
export const selectTopYear = (state: RootState) => state.calculator.topYear;
export const selectBottomYear = (state: RootState) => state.calculator.bottomYear;
export const selectMostBenefit = (state: RootState) => state.calculator.mostBenefitYears;
export const selectPreviousTwoYears = (state: RootState) => state.calculator.previousTwoYears;
export const selectTopYearMaxMin = (state: RootState) => state.calculator.topYearMaxMin;
export const selectBottomYearMaxMin = (state: RootState) => state.calculator.bottomYearMaxMin;
export const selectIsOnlyOneYearActive = (state: RootState) => state.calculator.isOnlyOneYearActive;

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
  selectTopYearMaxMin,
  selectBottomYearMaxMin,
  selectIsOnlyOneYearActive,
  (
    topYear,
    bottomYear,
    mostBenefitYears,
    helperList,
    totalNotActiveYear,
    topMaxMin,
    bottomMaxMin,
  ) => {
    const total = helperList
      .filter((item) => {
        return item.year === topYear.value || item.year === bottomYear.value;
      })
      .reduce((acc: any, item) => {
        return acc + item.dailyAmount;
      }, 0);
    const isTheBest = isMostBenefitYears(topYear, bottomYear, mostBenefitYears);
    const diff = Number((total - totalNotActiveYear).toFixed(2));
    return {
      controller: {
        top: controllerArrow(topYear.value, topMaxMin),
        bottom: controllerArrow(bottomYear.value, bottomMaxMin),
      },
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
    const filtered = helperList.filter(
      (item) => item.year === top.value || item.year === bottom.value,
    );
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
