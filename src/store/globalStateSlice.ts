import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import initReplaceYear from '../middlewares/initReplaceYear';
import getHelperList from '../middlewares/getHelperList';
import { checkIsThereMoreThanOneNotSelectableYear, mappingInitData } from '../helpers';
import formingApplication from '../middlewares/formingApplication';

export enum STATUS_APPLICATION {
  Error = 'Error',
  Success = 'Success',
}

export enum ACCESS_APPLICATION {
  NoRight = 'NoRight',
  NeedOriginalReference = 'NeedOriginalReference',
  ToApply = 'ToApply',
  BestYears = 'BestYears',
}

export interface InitData {
  reqId: string;
  statusId: string;
  CurrentYear1: string;
  CurrentYear1Repl: boolean;
  CurrentYear2: string;
  CurrentYear2Repl: boolean;
  CurrentAmount: number;
}

export interface GlobalState {
  statusApplication: STATUS_APPLICATION | undefined;
  accessApplication: ACCESS_APPLICATION | undefined;
  hasAlreadyOneMessage: string;
  initLoading: boolean;
  formingApplicationLoading: boolean;
  initDataForPostRequest: InitData;
  applicationAttachmentId: string;
  isHandSignature: boolean | undefined;
}

const initialState: GlobalState = {
  statusApplication: undefined,
  accessApplication: undefined,
  hasAlreadyOneMessage: '',
  initLoading: true,
  formingApplicationLoading: false,
  initDataForPostRequest: {} as InitData,
  applicationAttachmentId: '',
  isHandSignature: undefined,
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
    switchOnHasAlreadyOne: (state) => {
      state.hasAlreadyOneMessage = '';
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
    builder.addCase(initReplaceYear.pending, (state) => {
      state.initLoading = true;
    });
    builder.addCase(initReplaceYear.fulfilled, (state, action) => {
      if (action.payload.message) {
        state.hasAlreadyOneMessage = action.payload.message;
      }
      state.initLoading = false;
      state.initDataForPostRequest = mappingInitData(action.payload);
      state.isHandSignature = action.payload.anotherEmployer;
    });
    builder.addCase(initReplaceYear.rejected, (state, action) => {
      state.accessApplication = action.payload;
      state.initLoading = false;
    });
    builder.addCase(formingApplication.pending, (state, action) => {
      state.formingApplicationLoading = true;
    });
    builder.addCase(formingApplication.fulfilled, (state, action) => {
      state.formingApplicationLoading = false;
      state.applicationAttachmentId = action.payload.Id;
    });
    builder.addCase(formingApplication.rejected, (state, action) => {
      state.formingApplicationLoading = false;
    });
  },
});
export const { setStatusApplication, switchOnHasAlreadyOne } = globalStateSlice.actions;
export default globalStateSlice.reducer;
