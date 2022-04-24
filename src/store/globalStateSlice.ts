import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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
}

const initialState: GlobalState = {
  statusApplication: null,
  accessApplication: ACCESS_APPLICATION.ToApply,
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
  extraReducers: () => {},
});

export default globalStateSlice.reducer;
