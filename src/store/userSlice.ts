import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from 'juicyfront/types/projects.types';
import authorization from '../middlewares/authorization';
import getHelperList from '../middlewares/getHelperList';

export interface UserState {
  loading: boolean;
  userLoaded: boolean;
  error: undefined | string[];
  user: IUser | undefined;
}

const initialState: UserState = {
  loading: true,
  userLoaded: false,
  error: undefined,
  user: undefined,
};

interface FulfilledAction<ThunkArg, PromiseResult> {
  type: string;
  payload: PromiseResult;
  meta: {
    requestId: string;
    arg: ThunkArg;
  };
}

export interface IPayloadFulFilledAUTH {
  user: FulfilledAction<any, any>['payload'];
  token: FulfilledAction<any, any>['payload'];
  permission: FulfilledAction<any, any>['payload'];
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(authorization.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      authorization.fulfilled,
      (state, action: PayloadAction<IPayloadFulFilledAUTH>) => {
        sessionStorage.setItem('CSRF', action.payload.token);
        state.user = action.payload.user;
        state.loading = false;
        state.userLoaded = true;
      },
    );
    builder.addCase(authorization.rejected, (state, action) => {
      console.log('reject');
      state.error = action.payload;
      state.loading = false;
    });
    builder.addCase(getHelperList.rejected, (state, action) => {
      state.error = action.payload;
    });
  },
});

// export const { changeName } = userSlice.actions;
export default userSlice.reducer;
