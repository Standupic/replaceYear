import { RootState } from '../store';

export const selectIsUserLoading = (state: RootState) => state.user.loading;
export const selectIsUserLoaded = (state: RootState) => state.user.userLoaded;
export const selectUser = (state: RootState) => state.user.user;
export const selectError = (state: RootState): undefined | string[] => state.user.error;
