import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import getHelperList from '../middlewares/getHelperList';
import { checkIsThereMoreThanOneNotSelectableYear } from '../helpers';

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
  accessApplication: null,
};

export const globalStateSlice = createSlice({
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
      if (action.payload.length < 3) {
        new Error('Пришло всего 2 года');
        state.accessApplication = ACCESS_APPLICATION.NoRight;
      }
      if (checkIsThereMoreThanOneNotSelectableYear(action.payload).length >= 2) {
        new Error('Пришло 2 недоступных года');
        state.accessApplication = ACCESS_APPLICATION.NoRight;
      }
    });
  },
});
export const { setStatusApplication, setAccessToApplication } = globalStateSlice.actions;
export default globalStateSlice.reducer;
