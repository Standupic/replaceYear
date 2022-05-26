import { RootState } from '../store';

export const selectStatusApplication = (state: RootState) => state.globalState.statusApplication;

export const selectAccessApplication = (state: RootState) => state.globalState.accessApplication;

export const selectInitLoading = (state: RootState) => state.globalState.initLoading;

export const selectHasAlreadyOneMessage = (state: RootState) =>
  state.globalState.hasAlreadyOneMessage;

export const selectParamsFormStatement = (state: RootState) =>
  state.globalState.paramsFormStatement;

export const selectFormingApplicationLoading = (state: RootState) =>
  state.globalState.formStatementLoading;

export const selectAttachmentId = (state: RootState) => state.globalState.statementAttachmentId;

export const selectIsHandSignature = (state: RootState) => state.globalState.isHandSignature;

export const selectPdfFileLoading = (state: RootState) => state.globalState.pdfFileLoading;
