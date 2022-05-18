import { createSlice } from '@reduxjs/toolkit';
import getHelperList from '../middlewares/getHelperList';
import { getMostBenefitYears, getPreviousTwoYears, mappingHelperList } from '../helpers';

export interface IHelperListAPI {
  year: number;
  Amount: number;
  currency: string;
  withoutAbsence: boolean;
}

export interface IHelperList {
  year: number;
  Amount: number;
  currency: string;
  withoutAbsence: boolean;
}

interface CalculatorState {
  topYear: number;
  bottomYear: number;
  mostBenefitYears: IHelperList[] | undefined;
  previousTwoYears: IHelperList[] | undefined;
  helperList: IHelperList[];
}

const initialState: CalculatorState = {
  topYear: 0,
  bottomYear: 0,
  mostBenefitYears: undefined,
  previousTwoYears: undefined,
  helperList: [] as IHelperList[],
};

const calculatorSlice = createSlice({
  name: 'calculator',
  initialState,
  reducers: {
    incrementYear: (state, action) => {
      switch (action.payload) {
        case 'topYear':
          state.topYear += 1;
          return state;
        case 'bottomYear':
          state.bottomYear += 1;
          return state;
        default:
          return state;
      }
    },
    decrementYear: (state, action) => {
      switch (action.payload) {
        case 'topYear':
          state.topYear -= 1;
          return state;
        case 'bottomYear':
          state.bottomYear -= 1;
          return state;
        default:
          return state;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getHelperList.fulfilled, (state, action) => {
      state.helperList = mappingHelperList(action.payload);
      console.log(mappingHelperList(action.payload));
      const theBestYears = getMostBenefitYears(mappingHelperList(action.payload));
      state.mostBenefitYears = theBestYears;
      state.previousTwoYears = getPreviousTwoYears(mappingHelperList(action.payload));
      state.topYear = theBestYears[0].year;
      state.bottomYear = theBestYears[1].year;
    });
  },
});
export const { incrementYear, decrementYear } = calculatorSlice.actions;
export default calculatorSlice.reducer;
