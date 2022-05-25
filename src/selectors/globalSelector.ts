import { RootState } from '../store';

export const selectStatusApplication = (state: RootState) => state.globalState.statusApplication;

export const selectAccessApplication = (state: RootState) => state.globalState.accessApplication;

export const selectInitLoading = (state: RootState) => state.globalState.initLoading;

export const selectHasAlreadyOneMessage = (state: RootState) =>
  state.globalState.hasAlreadyOneMessage;

export const selectInitData = (state: RootState) => state.globalState.initDataForPostRequest;

export const selectFormingApplicationLoading = (state: RootState) =>
  state.globalState.formingApplicationLoading;

export const selectAttachmentId = (state: RootState) => state.globalState.applicationAttachmentId;

export const selectIsHandSignature = (state: RootState) => state.globalState.isHandSignature;
