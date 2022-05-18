import { RootState } from '../store';

export const selectStatusApplication = (state: RootState['globalState']) => state.statusApplication;

export const selectAccessApplication = (state: RootState['globalState']) => state.accessApplication;
