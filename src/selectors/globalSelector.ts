import { RootState } from '../store';

export const selectStatusApplication = (state: RootState) => state.globalState.statusApplication;

export const selectAccessApplication = (state: RootState) => state.globalState.accessApplication;

export const selectInitLoading = (state: RootState) => state.globalState.initLoading;

export const selectHasAlreadyOneMessage = (state: RootState) =>
  state.globalState.hasAlreadyOneMessage;
