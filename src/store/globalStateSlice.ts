import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import initReplaceYear from '../middlewares/initReplaceYear';
import { mappingInitData, savePdfFile } from '../helpers';
import formStatement from '../middlewares/formStatement';
import getStatement, { IRequestAttachment } from '../middlewares/getStatement';
import submitManually from '../middlewares/submitManually';
import { decrementYear, incrementYear, toMostBenefit } from './calculatorSlice';

export enum STATUS_APPLICATION {
  Error = 'Error',
  Success = 'Success',
}

export enum ACCESS_APPLICATION {
  NoRight = 'NoRight',
  NeedOriginalReference = 'NeedOriginalReference',
  ToApply = 'ToApply',
  BestYears = 'BestYears',
  dataWrong = 'dataWrong',
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
  formStatementLoading: boolean;
  paramsStatement: InitData;
  paramsAttachment: IRequestAttachment | undefined;
  statementAttachmentId: string | false;
  isHandSignature: boolean | undefined;
  pdfFileLoading: boolean;
  initLoading: boolean;
}

const initialState: GlobalState = {
  statusApplication: undefined,
  accessApplication: undefined,
  hasAlreadyOneMessage: '',
  initLoading: true,
  formStatementLoading: false,
  paramsStatement: {} as InitData,
  statementAttachmentId: '',
  isHandSignature: undefined,
  pdfFileLoading: false,
  paramsAttachment: undefined,
};

export const globalStateSlice = createSlice({
  name: 'globalState',
  initialState,
  reducers: {
    setStatusApplication: (
      state: GlobalState,
      action: PayloadAction<STATUS_APPLICATION | undefined>,
    ) => {
      state.statusApplication = action.payload;
    },
    setAccessToApplication: (state: GlobalState, action: PayloadAction<ACCESS_APPLICATION>) => {
      state.accessApplication = action.payload;
    },
    switchOnHasAlreadyOne: (state) => {
      state.hasAlreadyOneMessage = '';
    },
    attachFile: (state, action: PayloadAction<{ base64: string | undefined }>) => {
      if (state.paramsStatement) {
        state.paramsAttachment = {
          ...state.paramsAttachment,
          base64: action.payload.base64,
          action: 'U',
        };
      }
    },
    resetStatementData: (state) => {
      state.paramsAttachment = undefined;
      state.isHandSignature = undefined;
      state.statementAttachmentId = '';
    },
  },
  extraReducers: (builder) => {
    builder.addCase(initReplaceYear.pending, (state) => {
      state.initLoading = true;
    });
    builder.addCase(initReplaceYear.fulfilled, (state, action) => {
      if (action.payload.message) {
        state.hasAlreadyOneMessage = action.payload.message;
      }
      state.initLoading = false;
      state.paramsStatement = mappingInitData(action.payload);
      state.isHandSignature = action.payload.anotherEmployer;
    });
    builder.addCase(initReplaceYear.rejected, (state, action) => {
      state.accessApplication = action.payload;
      state.initLoading = false;
    });
    builder.addCase(toMostBenefit, (state) => {
      state.paramsAttachment = undefined;
      state.isHandSignature = undefined;
      state.statementAttachmentId = '';
    });
    builder.addCase(incrementYear, (state) => {
      state.paramsAttachment = undefined;
      state.isHandSignature = undefined;
      state.statementAttachmentId = '';
    });
    builder.addCase(decrementYear, (state) => {
      state.paramsAttachment = undefined;
      state.isHandSignature = undefined;
      state.statementAttachmentId = '';
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
      state.statementAttachmentId = '';
    });
    builder.addCase(getStatement.fulfilled, (state, action) => {
      const { base64, fileName } = action.payload;
      if (base64 && fileName) {
        savePdfFile(base64, fileName);
      }
      state.pdfFileLoading = false;
      state.paramsAttachment = action.payload;
    });
    builder.addCase(getStatement.pending, (state) => {
      state.pdfFileLoading = true;
    });
    builder.addCase(getStatement.rejected, (state) => {
      state.pdfFileLoading = false;
    });
    builder.addCase(submitManually.fulfilled, (state) => {
      state.statusApplication = STATUS_APPLICATION.Success;
    });
    builder.addCase(submitManually.rejected, (state) => {
      state.statusApplication = STATUS_APPLICATION.Error;
    });
  },
});
export const {
  setStatusApplication,
  switchOnHasAlreadyOne,
  attachFile,
  setAccessToApplication,
  resetStatementData,
} = globalStateSlice.actions;
export default globalStateSlice.reducer;
