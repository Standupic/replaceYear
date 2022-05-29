import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { checkMostBenefitYear, controllerArrow } from '../helpers';
import { selectParamsFormStatement } from './globalSelector';

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
  return items?.reduce((acc: any, item) => {
    return acc + item.dailyAmount;
  }, 0);
});

export const selectTotalActiveYears = createSelector(
  selectTopYear,
  selectBottomYear,
  selectHelperList,
  (topYear, bottomYear, helperList) => {
    return helperList
      .filter((item) => {
        return item.year === topYear.value || item.year === bottomYear.value;
      })
      .reduce((acc: any, item) => {
        return acc + item.dailyAmount;
      }, 0);
  },
);

export const selectDelta = createSelector(
  selectTotalActiveYears,
  selectTotalNotActiveYears,
  (active, notActive) => {
    return Number((active - notActive).toFixed(2));
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
      diff: delta,
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

export const selectPostData = createSelector(
  selectTopYear,
  selectBottomYear,
  selectTotalActiveYears,
  selectParamsFormStatement,
  (top, bottom, total, initData) => {
    return {
      ...initData,
      NextYear1: top.value.toString(),
      NextYear2: bottom.value.toString(),
      CurrentAmount: total,
      currency: 'RUB',
    };
  },
);
