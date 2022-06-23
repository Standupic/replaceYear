import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import getApplication from '../middlewares/getApplication';
import deleteDraft from '../middlewares/deleteDraft';
import getEditedDraftStatement from '../middlewares/getEditedDraftStatement';
import { IAttachment } from '../middlewares/getStatement';
import editDraftStatement from '../middlewares/editDraft';
import { IApplicationMapped, PERMISSION_APPLICATIONS } from './applicationsSlice';
import { computingDraftApplication } from './calculatorSlice';

export enum STATUS_DRAFT_APPLICATION {
  Error = 'Error',
  Success = 'Success',
}

export interface DraftState {
  attachmentDraftId: string;
  toFormStatement: boolean;
  isSigned: boolean;
  currentDraft: IApplicationMapped;
  draftLoading: boolean;
  statusDraft: STATUS_DRAFT_APPLICATION | undefined;
  accessDraft: PERMISSION_APPLICATIONS | undefined;
  toFormLoading: boolean;
}

const initialState: DraftState = {
  attachmentDraftId: '',
  toFormStatement: false,
  isSigned: false,
  currentDraft: {} as IApplicationMapped,
  draftLoading: false,
  statusDraft: undefined,
  accessDraft: undefined,
  toFormLoading: false,
};

const draftSlice = createSlice({
  name: 'draft',
  initialState,
  reducers: {
    resetDraft: () => {
      return initialState;
    },
    toggleDraftSigned: (state: DraftState, action: PayloadAction<boolean>) => {
      state.isSigned = action.payload;
    },
    setDraftStatus: (
      state: DraftState,
      action: PayloadAction<STATUS_DRAFT_APPLICATION | undefined>,
    ) => {
      state.statusDraft = action.payload;
    },
    toggleDraftToFormStatement: (state: DraftState, action: PayloadAction<boolean>) => {
      state.toFormStatement = action.payload;
    },
    updateDraftAttachmentFile: (
      state: DraftState,
      action: PayloadAction<{ base64: string; cert?: string; singBase64?: string }>,
    ) => {
      state.currentDraft.attachment = {
        ...state.currentDraft.attachment,
        base64: action.payload.base64,
        action: 'U',
        cert: action.payload.cert,
        singBase64: action.payload.singBase64,
      };
      state.isSigned = true;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      computingDraftApplication,
      (state: DraftState, action: PayloadAction<IApplicationMapped>) => {
        if (action.payload.id) {
          state.attachmentDraftId = action.payload.id;
        }
      },
    );
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
    });
    builder.addCase(editDraftStatement.pending, (state: DraftState) => {
      state.toFormLoading = true;
    });
    builder.addCase(editDraftStatement.rejected, (state: DraftState) => {
      state.toFormLoading = false;
    });
  },
});

export const {
  resetDraft,
  setDraftStatus,
  toggleDraftToFormStatement,
  toggleDraftSigned,
  updateDraftAttachmentFile,
} = draftSlice.actions;

export default draftSlice.reducer;
