import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';
import {
  checkMostBenefitYear,
  controllerArrow,
  getDelta,
  sortIncomeYear,
  totalActiveYears,
  totalNotActiveYears,
} from '../helpers';

export const selectHelperList = (state: RootState) => state.calculator.helperList;
export const selectTopYear = (state: RootState) => state.calculator.topActiveYear;
export const selectBottomYear = (state: RootState) => state.calculator.bottomActiveYear;
export const selectPreviousYear = (state: RootState) => state.calculator.previousYear;
export const selectBeforePreviousYear = (state: RootState) => state.calculator.beforePreviousYear;
export const selectMostBenefit = (state: RootState) => state.calculator.mostBenefitYears;
export const selectPreviousTwoYears = (state: RootState) => state.calculator.previousTwoYears;
export const selectMinMax = (state: RootState) => state.calculator.minMaxYears;
export const selectIsOnlyOneYearActive = (state: RootState) => state.calculator.isOnlyOneYearActive;

export const selectTotalNotActiveYears = createSelector(selectPreviousTwoYears, (items) => {
  return totalNotActiveYears(items);
});

export const selectTotalActiveYears = createSelector(
  selectTopYear,
  selectBottomYear,
  selectHelperList,
  (topYear, bottomYear, helperList) => {
    return totalActiveYears(topYear, bottomYear, helperList);
  },
);

export const selectDelta = createSelector(
  selectTotalActiveYears,
  selectTotalNotActiveYears,
  (active, notActive) => {
    return getDelta(active, notActive);
  },
);

export const selectDataActiveYears = createSelector(
  selectTopYear,
  selectBottomYear,
  selectMostBenefit,
  selectDelta,
  selectMinMax,
  selectIsOnlyOneYearActive,
  selectTotalActiveYears,
  (topYear, bottomYear, mostBenefitYears, delta, minMax, isOnlyOneYear, totalActiveYears) => {
    const isTheBest = checkMostBenefitYear(isOnlyOneYear, {
      top: topYear,
      bottom: bottomYear,
      years: mostBenefitYears,
    });
    return {
      controller: {
        top: controllerArrow(topYear.value, [minMax.top.min, minMax.top.max]),
        bottom: controllerArrow(bottomYear.value, [minMax.bottom.min, minMax.bottom.max]),
      },
      total: totalActiveYears,
      isTheBest,
      delta: delta,
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
    const obj: Record<string, number> = filtered.reduce((acc, item) => {
      return { ...acc, [`${item.year}`]: item.Amount / 100 };
    }, {});
    if (Object.keys(obj).length === 2) {
      return {
        topYearIncome: obj[String(top.value)],
        bottomYearIncome: obj[String(bottom.value)],
      };
    }
    return {
      topYearIncome: 0,
      bottomYearIncome: 0,
    };
  },
);
