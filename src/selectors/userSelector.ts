import { RootState } from '../store';

export const selectIsUserLoading = (state: RootState) => state.user.loading;
