import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import initReplaceYear from '../middlewares/initReplaceYear';
import getHelperList from '../middlewares/getHelperList';
import { checkIsThereMoreThanOneNotSelectableYear, mappingInitData, savePdfFile } from '../helpers';
import formStatement from '../middlewares/formStatement';
import getStatement, { IRequestAttachment } from '../middlewares/getStatement';

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
  formStatementLoading: boolean;
  paramsFormStatement: InitData;
  statementAttachmentId: string | undefined;
  isHandSignature: boolean | undefined;
  pdfFileLoading: boolean;
  paramsAttachment: IRequestAttachment;
}

const initialState: GlobalState = {
  statusApplication: undefined,
  accessApplication: undefined,
  hasAlreadyOneMessage: '',
  initLoading: true,
  formStatementLoading: false,
  paramsFormStatement: {} as InitData,
  statementAttachmentId: '',
  isHandSignature: undefined,
  pdfFileLoading: false,
  paramsAttachment: {} as IRequestAttachment,
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
    attachFile: (state, action: PayloadAction<{ base64: string }>) => {
      state.paramsAttachment = {
        ...state.paramsAttachment,
        base64: action.payload.base64,
        action: 'U',
      };
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
      state.paramsFormStatement = mappingInitData(action.payload);
      state.isHandSignature = action.payload.anotherEmployer;
    });
    builder.addCase(initReplaceYear.rejected, (state, action) => {
      state.accessApplication = action.payload;
      state.initLoading = false;
    });
    builder.addCase(formStatement.pending, (state) => {
      state.formStatementLoading = true;
      state.statementAttachmentId = '';
    });
    builder.addCase(formStatement.fulfilled, (state, action) => {
      state.formStatementLoading = false;
      state.statementAttachmentId = action.payload.Id;
    });
    builder.addCase(formStatement.rejected, (state) => {
      state.formStatementLoading = false;
      state.statementAttachmentId = undefined;
    });
    builder.addCase(getStatement.fulfilled, (state, action) => {
      const { base64, fileName } = action.payload;
      savePdfFile(base64, fileName);
      state.pdfFileLoading = false;
      state.paramsAttachment = action.payload;
    });
    builder.addCase(getStatement.pending, (state) => {
      state.pdfFileLoading = true;
    });
    builder.addCase(getStatement.rejected, (state) => {
      state.pdfFileLoading = false;
    });
  },
});
export const { setStatusApplication, switchOnHasAlreadyOne, attachFile } = globalStateSlice.actions;
export default globalStateSlice.reducer;
