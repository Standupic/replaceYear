import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { controllerArrow, getCurrency, checkMostBenefitYear } from '../helpers';

export const selectHelperList = (state: RootState) => state.calculator.helperList;
export const selectTopYear = (state: RootState) => state.calculator.topYear;
export const selectBottomYear = (state: RootState) => state.calculator.bottomYear;
export const selectMostBenefit = (state: RootState) => state.calculator.mostBenefitYears;
export const selectPreviousTwoYears = (state: RootState) => state.calculator.previousTwoYears;
export const selectMinMax = (state: RootState) => state.calculator.minMaxYears;
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
  selectMinMax,
  selectIsOnlyOneYearActive,
  (
    topYear,
    bottomYear,
    mostBenefitYears,
    helperList,
    totalNotActiveYear,
    minMax,
    isOnlyOneYear,
  ) => {
    const total = helperList
      .filter((item) => {
        return item.year === topYear.value || item.year === bottomYear.value;
      })
      .reduce((acc: any, item) => {
        return acc + item.dailyAmount;
      }, 0);
    const isTheBest = checkMostBenefitYear(isOnlyOneYear, {
      top: topYear,
      bottom: bottomYear,
      years: mostBenefitYears,
    });
    const diff = Number((total - totalNotActiveYear).toFixed(2));
    return {
      controller: {
        top: controllerArrow(topYear.value, [minMax.top.min, minMax.top.max]),
        bottom: controllerArrow(bottomYear.value, [minMax.bottom.min, minMax.bottom.max]),
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
