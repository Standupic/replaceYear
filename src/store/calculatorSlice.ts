import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import getHelperList from '../middlewares/getHelperList';
import {
  checkIsThereNotSelectableYear,
  computingOnlyOneYearActive,
  computingTwoYearsActive,
  getPreviousTwoYears,
  mappingHelperList,
} from '../helpers';
import initReplaceYear from '../middlewares/initReplaceYear';
import { InitData } from './globalStateSlice';

export interface ITwoPreviousYears {
  previousYear: number;
  beforePreviousYear: number;
}

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

export interface CalculatorState {
  previousYear: number;
  beforePreviousYear: number;
  topActiveYear: IYear;
  bottomActiveYear: IYear;
  mostBenefitYears: IHelperList[];
  previousTwoYears: IHelperList[];
  helperList: IHelperList[];
  minMaxYears: IMinMaxYear;
  isOnlyOneYearActive: boolean;
}

const initialState: CalculatorState = {
  previousYear: 0,
  beforePreviousYear: 0,
  topActiveYear: { value: 0, isSelectable: true, stepLimitYear: 0 },
  bottomActiveYear: { value: 0, isSelectable: true, stepLimitYear: 0 },
  minMaxYears: { top: { min: 0, max: 0 }, bottom: { min: 0, max: 0 } },
  mostBenefitYears: [] as IHelperList[],
  previousTwoYears: [],
  helperList: [] as IHelperList[],
  isOnlyOneYearActive: false,
};

const calculatorSlice = createSlice({
  name: 'calculator',
  initialState,
  reducers: {
    toMostBenefit: (state: CalculatorState) => {
      if (state.isOnlyOneYearActive) {
        if (!state.topActiveYear.isSelectable) {
          state.bottomActiveYear.value = state.mostBenefitYears[0].year;
        }
        if (!state.bottomActiveYear.isSelectable) {
          state.topActiveYear.value = state.mostBenefitYears[0].year;
        }
      } else {
        state.topActiveYear.value = state.mostBenefitYears[0].year;
        state.bottomActiveYear.value = state.mostBenefitYears[1].year;
      }
    },
    incrementYear: (state: CalculatorState, action: PayloadAction<YEARS_KEY>) => {
      switch (action.payload) {
        case YEARS_KEY.topYear:
          if (
            state.bottomActiveYear.value === state.topActiveYear.value + 1 &&
            state.bottomActiveYear.isSelectable
          ) {
            state.bottomActiveYear.value += 1;
          }
          if (
            !state.bottomActiveYear.isSelectable &&
            state.topActiveYear.value === state.topActiveYear.stepLimitYear
          ) {
            state.topActiveYear.value += 2;
            return state;
          }
          state.topActiveYear.value += 1;
          return state;
        case YEARS_KEY.bottomYear:
          if (
            state.topActiveYear.value === state.bottomActiveYear.value + 1 &&
            state.topActiveYear.isSelectable
          ) {
            state.topActiveYear.value += 1;
          }
          state.bottomActiveYear.value += 1;
          return state;
        default:
          return state;
      }
    },
    decrementYear: (state: CalculatorState, action: PayloadAction<YEARS_KEY>) => {
      switch (action.payload) {
        case YEARS_KEY.topYear:
          if (
            state.bottomActiveYear.value === state.topActiveYear.value - 1 &&
            state.bottomActiveYear.isSelectable
          ) {
            state.bottomActiveYear.value -= 1;
          }
          if (
            !state.bottomActiveYear.isSelectable &&
            state.topActiveYear.value - 2 === state.topActiveYear.stepLimitYear
          ) {
            state.topActiveYear.value = state.topActiveYear.stepLimitYear;
            return state;
          }
          state.topActiveYear.value -= 1;
          return state;
        case YEARS_KEY.bottomYear:
          if (
            state.topActiveYear.value === state.bottomActiveYear.value - 1 &&
            state.topActiveYear.isSelectable
          ) {
            state.topActiveYear.value -= 1;
          }
          state.bottomActiveYear.value -= 1;
          return state;
        default:
          return state;
      }
    },
    computingDraftApplication: (
      state: CalculatorState,
      action: PayloadAction<InitData & { id?: string }>,
    ) => {
      state.previousTwoYears = getPreviousTwoYears(mappingHelperList(state.helperList), {
        previousYear: Number(action.payload.CurrentYear1),
        beforePreviousYear: Number(action.payload.CurrentYear2),
      });
      const isThereNotSelectable = checkIsThereNotSelectableYear(state.helperList, {
        previousYear: Number(action.payload.CurrentYear1),
        beforePreviousYear: Number(action.payload.CurrentYear2),
      });
      if (isThereNotSelectable) {
        console.log('Only one year in daft');
        const { year, value } = isThereNotSelectable;
        return computingOnlyOneYearActive(state, year, value);
      } else {
        console.log('Two active years in draft');
        return computingTwoYearsActive(state);
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getHelperList.fulfilled, (state, action) => {
      state.helperList = mappingHelperList(action.payload);

      state.previousTwoYears = getPreviousTwoYears(mappingHelperList(action.payload), {
        previousYear: state.previousYear,
        beforePreviousYear: state.beforePreviousYear,
      });
      const isThereNotSelectable = checkIsThereNotSelectableYear(action.payload, {
        previousYear: state.previousYear,
        beforePreviousYear: state.beforePreviousYear,
      });
      if (isThereNotSelectable) {
        console.log('Only one year');
        const { year, value } = isThereNotSelectable;
        return computingOnlyOneYearActive(state, year, value);
      } else {
        console.log('Two active years');
        return computingTwoYearsActive(state);
      }
    });
    builder.addCase(initReplaceYear.fulfilled, (state, action) => {
      state.previousYear = Number(action.payload.CurrentYear1);
      state.beforePreviousYear = Number(action.payload.CurrentYear2);
    });
  },
});
export const { incrementYear, decrementYear, toMostBenefit, computingDraftApplication } =
  calculatorSlice.actions;
export default calculatorSlice.reducer;
