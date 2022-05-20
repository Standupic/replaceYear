import { createSlice } from '@reduxjs/toolkit';
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

interface CalculatorState {
  topYear: { value: number; isSelectable: boolean; step: number };
  bottomYear: { value: number; isSelectable: boolean; step: number };
  mostBenefitYears: IHelperList[];
  previousTwoYears: IHelperList[];
  helperList: IHelperList[];
  topYearMaxMin: number[];
  bottomYearMaxMin: number[];
  isOnlyOneYearActive: boolean;
}

const initialState: CalculatorState = {
  topYear: { value: 0, isSelectable: false, step: 2 },
  bottomYear: { value: 0, isSelectable: false, step: 1 },
  topYearMaxMin: [],
  bottomYearMaxMin: [],
  mostBenefitYears: [],
  previousTwoYears: [],
  helperList: [] as IHelperList[],
  isOnlyOneYearActive: false,
};

const calculatorSlice = createSlice({
  name: 'calculator',
  initialState,
  reducers: {
    toMostBenefit: (state) => {
      state.topYear.value = state.mostBenefitYears[0].year;
      state.bottomYear.value = state.mostBenefitYears[1].year;
    },
    incrementYear: (state, action) => {
      switch (action.payload) {
        case 'topYear':
          if (
            state.bottomYear.value === state.topYear.value + 1 &&
            !state.bottomYear.isSelectable
          ) {
            state.bottomYear.value += 1;
          }
          state.topYear.value += 1;
          return state;
        case 'bottomYear':
          if (state.topYear.value === state.bottomYear.value + 1 && !state.topYear.isSelectable) {
            state.topYear.value += 1;
          }
          state.bottomYear.value += 1;
          return state;
        default:
          return state;
      }
    },
    decrementYear: (state, action) => {
      switch (action.payload) {
        case 'topYear':
          if (
            state.bottomYear.value === state.topYear.value - 1 &&
            !state.bottomYear.isSelectable
          ) {
            state.bottomYear.value -= 1;
          }
          state.topYear.value -= 1;
          return state;
        case 'bottomYear':
          if (state.topYear.value === state.bottomYear.value - 1 && !state.topYear.isSelectable) {
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
      console.log(checkIsThereNotSelectableYear(action.payload));
      const isThereNotSelectable = checkIsThereNotSelectableYear(action.payload);
      if (isThereNotSelectable) {
        console.log('1');
        state.isOnlyOneYearActive = true;
        if (isThereNotSelectable.value === 'bottomYear') {
          state.bottomYear = {
            ...state.bottomYear,
            value: isThereNotSelectable.year,
            isSelectable: true,
          };
          const theBestYear = getMostBenefitYear(action.payload, isThereNotSelectable.year);
          console.log(theBestYear);
          state.mostBenefitYears = theBestYear;
          state.topYear.value = theBestYear[0].year;
        }
        if (isThereNotSelectable.value === 'topYear') {
          state.topYear = {
            ...state.topYear,
            value: isThereNotSelectable.year,
            isSelectable: true,
          };
          const theBestYear = getMostBenefitYear(action.payload, isThereNotSelectable.year);
          console.log(theBestYear);
          state.mostBenefitYears = theBestYear;
          state.bottomYear.value = theBestYear[0].year;
        }
        const { top, bottom } = minMaxYear(action.payload);
        state.bottomYearMaxMin = bottom;
        state.topYearMaxMin = top;
      } else {
        console.log('2');
        const theBestYears = getMostBenefitYears(mappingHelperList(action.payload));
        state.topYear.value = theBestYears[0].year;
        state.bottomYear.value = theBestYears[1].year;
        const { top, bottom } = minMaxYears(action.payload);
        state.bottomYearMaxMin = bottom;
        state.topYearMaxMin = top;
        state.mostBenefitYears = theBestYears;
      }
      // const { top, bottom } = minMaxYears(action.payload);
      // const theBestYears = getMostBenefitYears(mappingHelperList(action.payload));
      state.previousTwoYears = getPreviousTwoYears(mappingHelperList(action.payload));
      // state.bottomYearMaxMin = bottom;
      // state.topYearMaxMin = top;
      // state.mostBenefitYears = theBestYears;
      // state.topYear = theBestYears[0].year;
      // state.bottomYear = theBestYears[1].year;
    });
  },
});
export const { incrementYear, decrementYear, toMostBenefit } = calculatorSlice.actions;
export default calculatorSlice.reducer;
