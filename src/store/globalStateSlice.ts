import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useHistory } from 'react-router-dom';
import initReplaceYear from '../middlewares/initReplaceYear';
import { mappingGetStatement, mappingInitData, savePdfFile } from '../helpers';
import formStatement from '../middlewares/formStatement';
import getStatement, { IAttachment } from '../middlewares/getStatement';
import submitStatement from '../middlewares/submitStatement';
import { computingDraftApplication } from './calculatorSlice';
import { IApplicationMapped } from './applicationsSlice';

export type LocalHistory = ReturnType<typeof useHistory>;

export enum STATUS_APPLICATION {
  Error = 'Error',
  Success = 'Success',
}

export enum ACCESS_APPLICATION {
  NoRight = 'NoRight',
  NeedOriginalReference = 'NeedOriginalReference',
  ToApply = 'ToApply',
  BestYears = 'BestYears',
  DataWrong = 'DataWrong',
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
  date: string;
  paramsStatement: InitData;
  paramsAttachment: IAttachment | undefined;
  isSigned: boolean;
  statementAttachmentId: string | false;
  isHandSignature: boolean | undefined;
  isVisibleFormStatement: boolean;
  pdfFileLoading: boolean;
  initLoading: boolean;
  formStatementLoading: boolean;
  submitLoading: boolean;
}

const initialState: GlobalState = {
  statusApplication: undefined,
  accessApplication: undefined,
  hasAlreadyOneMessage: '',
  paramsStatement: {} as InitData,
  statementAttachmentId: '',
  isHandSignature: undefined,
  paramsAttachment: undefined,
  isSigned: false,
  date: new Date().toLocaleDateString(),
  isVisibleFormStatement: true,
  initLoading: false,
  pdfFileLoading: false,
  formStatementLoading: false,
  submitLoading: false,
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
    toggleHasAlreadyOne: (state) => {
      state.hasAlreadyOneMessage = '';
    },
    toggleIsVisibleFormStatement: (state: GlobalState, action: PayloadAction<boolean>) => {
      state.isVisibleFormStatement = action.payload;
    },
    attachFile: (
      state,
      action: PayloadAction<{ base64: string; cert?: string; singBase64?: string }>,
    ) => {
      if (state.paramsStatement) {
        // @ts-ignore
        state.paramsAttachment = {
          ...state.paramsAttachment,
          base64: action.payload.base64,
          action: 'U',
          cert: action.payload.cert,
          singBase64: action.payload.singBase64,
        };
      }
      state.isSigned = true;
    },
    cancelSign: (state: GlobalState) => {
      state.isSigned = false;
    },
    modalHandler: () => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(initReplaceYear.pending, (state: GlobalState) => {
      state.initLoading = true;
    });
    builder.addCase(initReplaceYear.fulfilled, (state: GlobalState, action) => {
      if (action.payload.message) {
        state.hasAlreadyOneMessage = action.payload.message;
      }
      state.paramsStatement = mappingInitData(action.payload);
      state.isHandSignature = action.payload.anotherEmployer;
      state.initLoading = false;
    });
    builder.addCase(initReplaceYear.rejected, (state: GlobalState, action) => {
      state.accessApplication = action.payload;
      state.initLoading = false;
    });
    builder.addCase(formStatement.pending, (state: GlobalState) => {
      state.formStatementLoading = true;
    });
    builder.addCase(formStatement.fulfilled, (state: GlobalState, action) => {
      state.formStatementLoading = false;
      state.statementAttachmentId = action.payload.Id;
    });
    builder.addCase(formStatement.rejected, (state: GlobalState) => {
      state.formStatementLoading = false;
    });
    builder.addCase(getStatement.fulfilled, (state: GlobalState, action) => {
      state.pdfFileLoading = false;
      const mappedData = mappingGetStatement(action.payload);
      state.paramsAttachment = mappedData;
      if (!state.isHandSignature) {
        return state;
      } else {
        const { base64, fileName } = mappedData;
        if (base64 && fileName) {
          savePdfFile(base64, fileName);
        }
      }
    });
    builder.addCase(getStatement.pending, (state: GlobalState) => {
      state.pdfFileLoading = true;
    });
    builder.addCase(getStatement.rejected, (state: GlobalState) => {
      state.pdfFileLoading = false;
    });
    builder.addCase(submitStatement.pending, (state: GlobalState) => {
      state.submitLoading = true;
    });
    builder.addCase(submitStatement.fulfilled, (state: GlobalState) => {
      state.statusApplication = STATUS_APPLICATION.Success;
      state.submitLoading = false;
    });
    builder.addCase(submitStatement.rejected, (state: GlobalState) => {
      state.statusApplication = STATUS_APPLICATION.Error;
      state.submitLoading = false;
    });
    builder.addCase(
      computingDraftApplication,
      (state: GlobalState, action: PayloadAction<IApplicationMapped>) => {
        if (action.payload.id) {
          state.statementAttachmentId = action.payload.id;
        }
      },
    );
  },
});
export const {
  setStatusApplication,
  toggleHasAlreadyOne,
  attachFile,
  setAccessToApplication,
  cancelSign,
  modalHandler,
  toggleIsVisibleFormStatement,
} = globalStateSlice.actions;
export default globalStateSlice.reducer;
