import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import getHelperList from '../middlewares/getHelperList';
import {
  checkIsThereNotSelectableYear,
  getMostBenefitYear,
  getMostBenefitYears,
  getPreviousTwoYears,
  mappingHelperList,
  minMaxYear,
  minMaxYears,
} from '../helpers';

export enum YEARS_KEY {
  topYear = 'topYear',
  bottomYear = 'bottomYear',
}

export interface IMinMaxYear {
  top: { min: number; max: number };
  bottom: { min: number; max: number };
}

export interface IYear {
  value: number;
  isSelectable: boolean;
  stepLimitYear: number;
}

export interface IHelperListAPI {
  year: number;
  Amount: number;
  dailyAmount: number;
  currency: string;
  withoutAbsence: boolean;
  selectable: boolean;
}

export interface IHelperList {
  year: number;
  Amount: number;
  dailyAmount: number;
  currency: string;
  withoutAbsence: boolean;
  selectable: boolean;
}

export interface IBenefitYears {
  topBenefit: number;
  bottomBenefit: number;
}

interface CalculatorState {
  topYear: IYear;
  bottomYear: IYear;
  mostBenefitYears: IBenefitYears;
  previousTwoYears: IHelperList[];
  helperList: IHelperList[];
  minMaxYears: IMinMaxYear;
  isOnlyOneYearActive: boolean;
}

const initialState: CalculatorState = {
  topYear: { value: 0, isSelectable: true, stepLimitYear: 0 },
  bottomYear: { value: 0, isSelectable: true, stepLimitYear: 0 },
  minMaxYears: { top: { min: 0, max: 0 }, bottom: { min: 0, max: 0 } },
  mostBenefitYears: {} as IBenefitYears,
  previousTwoYears: [],
  helperList: [] as IHelperList[],
  isOnlyOneYearActive: false,
};

const calculatorSlice = createSlice({
  name: 'calculator',
  initialState,
  reducers: {
    toMostBenefit: (state) => {
      if (state.isOnlyOneYearActive) {
        if (!state.topYear.isSelectable) {
          state.bottomYear.value = state.mostBenefitYears.bottomBenefit;
        }
        if (!state.bottomYear.isSelectable) {
          state.topYear.value = state.mostBenefitYears.topBenefit;
        }
      } else {
        state.topYear.value = state.mostBenefitYears.topBenefit;
        state.bottomYear.value = state.mostBenefitYears.bottomBenefit;
      }
    },
    incrementYear: (state, action: PayloadAction<YEARS_KEY>) => {
      switch (action.payload) {
        case YEARS_KEY.topYear:
          if (state.bottomYear.value === state.topYear.value + 1 && state.bottomYear.isSelectable) {
            state.bottomYear.value += 1;
          }
          if (
            !state.bottomYear.isSelectable &&
            state.topYear.value === state.topYear.stepLimitYear
          ) {
            state.topYear.value += 2;
            return state;
          }
          state.topYear.value += 1;
          return state;
        case YEARS_KEY.bottomYear:
          if (state.topYear.value === state.bottomYear.value + 1 && state.topYear.isSelectable) {
            state.topYear.value += 1;
          }
          state.bottomYear.value += 1;
          return state;
        default:
          return state;
      }
    },
    decrementYear: (state, action: PayloadAction<YEARS_KEY>) => {
      switch (action.payload) {
        case YEARS_KEY.topYear:
          if (state.bottomYear.value === state.topYear.value - 1 && state.bottomYear.isSelectable) {
            state.bottomYear.value -= 1;
          }
          if (
            !state.bottomYear.isSelectable &&
            state.topYear.value - 2 === state.topYear.stepLimitYear
          ) {
            state.topYear.value = state.topYear.stepLimitYear;
            return state;
          }
          state.topYear.value -= 1;
          return state;
        case YEARS_KEY.bottomYear:
          if (state.topYear.value === state.bottomYear.value - 1 && state.topYear.isSelectable) {
            state.topYear.value -= 1;
          }
          state.bottomYear.value -= 1;
          return state;
        default:
          return state;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getHelperList.fulfilled, (state, action) => {
      state.helperList = mappingHelperList(action.payload);
      state.previousTwoYears = getPreviousTwoYears(mappingHelperList(action.payload));
      const isThereNotSelectable = checkIsThereNotSelectableYear(action.payload);
      if (isThereNotSelectable) {
        console.log('Only one year');
        state.isOnlyOneYearActive = true;
        const mostBenefitYears = getMostBenefitYear(action.payload, isThereNotSelectable.year);
        if (mostBenefitYears) {
          state.mostBenefitYears = mostBenefitYears;
        }
        console.log(minMaxYear(action.payload));
        state.minMaxYears = minMaxYear(action.payload);
        switch (isThereNotSelectable.value) {
          case YEARS_KEY.bottomYear:
            state.bottomYear.value = isThereNotSelectable.year;
            state.bottomYear.isSelectable = false;
            state.topYear.value = mostBenefitYears.topBenefit;
            state.topYear.stepLimitYear = state.minMaxYears.top.max - 2;
            return state;
          case YEARS_KEY.topYear:
            state.topYear.value = isThereNotSelectable.year;
            state.topYear.isSelectable = false;
            state.bottomYear.value = mostBenefitYears.bottomBenefit;
            return state;
          default:
            return state;
        }
      } else {
        console.log('Two active years');
        const theBestYears = getMostBenefitYears(mappingHelperList(action.payload));
        if (theBestYears) {
          state.topYear.value = theBestYears.topBenefit;
          state.bottomYear.value = theBestYears.bottomBenefit;
        }
        state.minMaxYears = minMaxYears(action.payload);
        state.mostBenefitYears = theBestYears;
      }
    });
  },
});
export const { incrementYear, decrementYear, toMostBenefit } = calculatorSlice.actions;
export default calculatorSlice.reducer;
