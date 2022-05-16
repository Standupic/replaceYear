import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from 'juicyfront/types/projects.types';
import authorization from '../middlewares/authorization';

export interface UserState {
  loading: boolean;
  userLoaded: boolean;
  error: undefined | string[];
  user: IUser;
}

const initialState: UserState = {
  loading: false,
  userLoaded: false,
  error: undefined,
  user: {} as IUser,
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
  },
});

// export const { changeName } = userSlice.actions;
export default userSlice.reducer;
