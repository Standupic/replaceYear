import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import initReplaceYear from '../middlewares/initReplaceYear';
import { mappingInitData, savePdfFile } from '../helpers';
import formStatement from '../middlewares/formStatement';
import getStatement, { IAttachment } from '../middlewares/getStatement';
import submitStatement from '../middlewares/submitStatement';
import getInitMessage from "../middlewares/getInitMessage";
import getDraftStatement from "../middlewares/getDraftStatement";

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
  previousYear: number;
  beforePreviousYear: number;
}

export interface GlobalState {
  statusApplication: STATUS_APPLICATION | undefined;
  accessApplication: ACCESS_APPLICATION | undefined;
  initData: InitData;
  hasAlreadyOneMessage: string;
  date: string;
  attachment: IAttachment | undefined;
  isSigned: boolean;
  attachmentId: string;
  isHandSignature: boolean | undefined;
  isVisibleFormStatement: boolean;
  toContinue: boolean;
  pdfFileLoading: boolean;
  initLoading: boolean;
  formStatementLoading: boolean;
  submitLoading: boolean;
}

const initialState: GlobalState = {
  statusApplication: undefined,
  accessApplication: undefined,
  initData: {} as InitData,
  hasAlreadyOneMessage: '',
  attachmentId: '',
  isHandSignature: undefined,
  attachment: undefined,
  isSigned: false,
  date: new Date().toLocaleDateString(),
  isVisibleFormStatement: true,
  toContinue: false,
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
    resetStatementAttachmentId: (state: GlobalState) => {
      state.attachmentId = '';
    },
    resetStatementAttachment: (state: GlobalState) => {
      state.attachment = undefined;
      state.isSigned = false;
    },
    toggleToContinue: (state: GlobalState, action: PayloadAction<boolean>) => {
      state.toContinue = action.payload;
    },
    toggleIsVisibleFormStatement: (state: GlobalState, action: PayloadAction<boolean>) => {
      state.isVisibleFormStatement = action.payload;
    },
    updateAttachNewApplicationFile: (
      state,
      action: PayloadAction<{ base64: string; cert?: string; singBase64?: string }>,
    ) => {
      // @ts-ignore
      state.attachment = {
        ...state.attachment,
        base64: action.payload.base64,
        action: 'U',
        cert: action.payload.cert,
        singBase64: action.payload.singBase64,
      };
      state.isSigned = true;
    },
    cancelSign: (state: GlobalState) => {
      state.isSigned = false;
    },
    resetCreateApplication: (state: GlobalState) => {
      state.attachmentId = '';
      state.attachment = undefined;
      state.isSigned = false;
      state.isVisibleFormStatement = true;
    },
    reset: (state: GlobalState) => {
      state.attachmentId = '';
      state.attachment = undefined;
      state.isSigned = false;
      state.isVisibleFormStatement = true;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(initReplaceYear.pending, (state: GlobalState) => {
      state.initLoading = true;
    });
    builder.addCase(initReplaceYear.fulfilled, (state: GlobalState, action) => {
      if (action.payload.message) {
        state.hasAlreadyOneMessage = action.payload.message;
      } else {
        state.toContinue = true;
      }
      state.initData = mappingInitData(action.payload);
      state.isHandSignature = action.payload.anotherEmployer;
      state.initLoading = false;
    });
    builder.addCase(initReplaceYear.rejected, (state: GlobalState, action) => {
      state.accessApplication = action.payload;
      state.initLoading = false;
    });
    builder.addCase(getInitMessage.fulfilled, (state: GlobalState, action) => {
      state.hasAlreadyOneMessage = action.payload;
    });
    builder.addCase(formStatement.pending, (state: GlobalState) => {
      state.formStatementLoading = true;
    });
    builder.addCase(formStatement.fulfilled, (state: GlobalState, action) => {
      state.formStatementLoading = false;
      state.attachmentId = action.payload.Id;
    });
    builder.addCase(formStatement.rejected, (state: GlobalState) => {
      state.formStatementLoading = false;
    });
    builder.addCase(
      getStatement.fulfilled,
      (state: GlobalState, action: PayloadAction<IAttachment>) => {
        state.pdfFileLoading = false;
        state.attachment = action.payload;
        if (!state.isHandSignature) {
          return state;
        } else {
          const { base64, fileName } = action.payload;
          if (base64 && fileName) {
            savePdfFile(base64, fileName);
          }
        }
        return state;
      },
    );
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
  },
});
export const {
  setStatusApplication,
  toggleToContinue,
  updateAttachNewApplicationFile,
  setAccessToApplication,
  cancelSign,
  toggleIsVisibleFormStatement,
  reset,
  resetStatementAttachment,
  resetCreateApplication,
  resetStatementAttachmentId,
} = globalStateSlice.actions;
export default globalStateSlice.reducer;
