import { RootState } from '../store';

export const selectIsUserLoading = (state: RootState) => state.user.loading;
export const selectIsUser = (state: RootState) => state.user.user;
