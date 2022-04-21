import { RootState } from '../store';

export const selectStatusApplication = (state: RootState) => state.globalState.statusApplication;

export const selectAccessApplication = (state: RootState) => state.globalState.accessApplication;
