import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import getApplication from '../middlewares/getApplication';
import deleteDraft from '../middlewares/deleteDraft';
import getEditedDraftStatement from '../middlewares/getEditedDraftStatement';
import { IAttachment } from '../middlewares/getStatement';
import editDraftStatement from '../middlewares/editDraft';
import { savePdfFile } from '../helpers';
import getDraftStatement from '../middlewares/getDraftStatement';
import { IApplicationMapped, PERMISSION_APPLICATIONS } from './applicationsSlice';
import { IFile } from './globalStateSlice';

export enum STATUS_DRAFT_APPLICATION {
  Error = 'Error',
  Success = 'Success',
}

export interface DraftState {
  toFormStatement: boolean;
  isSigned: boolean;
  currentDraft: IApplicationMapped;
  draftLoading: boolean;
  statusDraft: STATUS_DRAFT_APPLICATION | undefined;
  accessDraft: PERMISSION_APPLICATIONS | undefined;
  toFormLoading: boolean;
  pdfFileLoading: boolean;
  isPdf: boolean;
}

const initialState: DraftState = {
  toFormStatement: false,
  isSigned: false,
  currentDraft: {} as IApplicationMapped,
  draftLoading: false,
  statusDraft: undefined,
  accessDraft: undefined,
  toFormLoading: false,
  pdfFileLoading: false,
  isPdf: true,
};

const draftSlice = createSlice({
  name: 'draft',
  initialState,
  reducers: {
    reset: () => {
      return initialState;
    },
    cancelDraftSigned: (state: DraftState) => {
      state.isSigned = false;
      state.currentDraft.attachment = {} as IAttachment;
      state.isPdf = true;
      state.toFormStatement = true;
    },
    setDraftStatus: (
      state: DraftState,
      action: PayloadAction<STATUS_DRAFT_APPLICATION | undefined>,
    ) => {
      state.statusDraft = action.payload;
    },
    updateDraftAttachmentFile: (state: DraftState, action: PayloadAction<IFile>) => {
      if (action.payload.fileName) {
        state.isPdf = action.payload.fileName.split('.')[1] === 'pdf';
      }
      state.currentDraft.attachment = {
        ...state.currentDraft.attachment,
        base64: action.payload.base64,
        action: 'U',
        cert: action.payload.cert,
        singBase64: action.payload.singBase64,
        // @ts-ignore
        fileName: action.payload.fileName,
      };
      state.isSigned = true;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      getEditedDraftStatement.fulfilled,
      (state: DraftState, action: PayloadAction<IAttachment>) => {
        state.currentDraft.attachment = action.payload;
        state.toFormStatement = false;
      },
    );
    builder.addCase(getEditedDraftStatement.pending, (state: DraftState) => {
      state.toFormStatement = true;
    });
    builder.addCase(getEditedDraftStatement.rejected, (state: DraftState) => {
      state.toFormStatement = true;
    });
    builder.addCase(
      getApplication.fulfilled,
      (state: DraftState, action: PayloadAction<IApplicationMapped>) => {
        state.currentDraft = action.payload;
        state.draftLoading = false;
      },
    );
    builder.addCase(getApplication.rejected, (state: DraftState) => {
      state.draftLoading = false;
      state.accessDraft = PERMISSION_APPLICATIONS.SomeThingWrong;
    });
    builder.addCase(getApplication.pending, (state: DraftState) => {
      state.draftLoading = true;
    });
    builder.addCase(deleteDraft.fulfilled, (state: DraftState) => {
      state.draftLoading = false;
      state.statusDraft = STATUS_DRAFT_APPLICATION.Success;
    });
    builder.addCase(deleteDraft.pending, (state: DraftState) => {
      state.draftLoading = true;
    });
    builder.addCase(deleteDraft.rejected, (state: DraftState) => {
      state.draftLoading = false;
      state.statusDraft = STATUS_DRAFT_APPLICATION.Error;
    });
    builder.addCase(editDraftStatement.fulfilled, (state: DraftState) => {
      state.toFormLoading = false;
      state.toFormStatement = false;
    });
    builder.addCase(editDraftStatement.pending, (state: DraftState) => {
      state.toFormLoading = true;
    });
    builder.addCase(editDraftStatement.rejected, (state: DraftState) => {
      state.toFormLoading = false;
    });
    builder.addCase(
      getDraftStatement.fulfilled,
      (state: DraftState, action: PayloadAction<IAttachment>) => {
        state.currentDraft.attachment = action.payload;
        state.pdfFileLoading = false;
        const { base64, fileName } = action.payload;
        if (base64 && fileName) {
          savePdfFile(base64, fileName);
        }
        return state;
      },
    );
    builder.addCase(getDraftStatement.pending, (state: DraftState) => {
      state.pdfFileLoading = true;
    });
    builder.addCase(getDraftStatement.rejected, (state: DraftState) => {
      state.pdfFileLoading = false;
    });
  },
});

export const { reset, setDraftStatus, cancelDraftSigned, updateDraftAttachmentFile } =
  draftSlice.actions;

export default draftSlice.reducer;
