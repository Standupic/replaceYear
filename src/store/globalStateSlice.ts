import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import authorization from '../middlewares/authorization';
import getHelperList from '../middlewares/getHelperList';
import userSlice from './userSlice';

export interface IHelperList {
  year: string;
  Amount: number;
  currency: string;
  withoutAbsence: boolean;
}

export enum STATUS_APPLICATION {
  Error = 'Error',
  Success = 'Success',
}

export enum ACCESS_APPLICATION {
  NoRight = 'NoRight',
  NeedOriginalReference = 'NeedOriginalReference',
  ToApply = 'ToApply',
}

export interface GlobalState {
  statusApplication: STATUS_APPLICATION | null;
  accessApplication: ACCESS_APPLICATION | null;
  helperList: IHelperList[];
}

const initialState: GlobalState = {
  statusApplication: null,
  accessApplication: null,
  helperList: [] as IHelperList[],
};

const globalStateSlice = createSlice({
  name: 'globalState',
  initialState,
  reducers: {
    setStatusApplication: (state: GlobalState, action: PayloadAction<STATUS_APPLICATION>) => {
      state.statusApplication = action.payload;
    },
    setAccessToApplication: (state: GlobalState, action: PayloadAction<ACCESS_APPLICATION>) => {
      state.accessApplication = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getHelperList.fulfilled, (state, action) => {
      state.helperList = action.payload;
    });
  },
});

export default globalStateSlice.reducer;
