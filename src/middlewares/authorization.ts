import { createAsyncThunk } from '@reduxjs/toolkit';
import { getToken, getUser, getPermissions } from './user';

const authorization = createAsyncThunk('authorization', async (_, api) => {
  const result = await Promise.all([
    api.dispatch(getToken()),
    api.dispatch(getUser()),
    api.dispatch(getPermissions()),
  ]);

  if (result.find((item: any) => item.error)) {
    const errors = result.map((item) => item.payload);
    return api.rejectWithValue(errors);
  } else {
    return {
      user: result[0].payload,
      token: result[1].payload,
      permission: result[2].payload,
    };
  }
});

export default authorization;
