import { createAsyncThunk } from '@reduxjs/toolkit';
import Axios from '../api/interceptor';

export const getUser = createAsyncThunk('users/getUser', async (_, { rejectWithValue }) => {
  try {
    const user = await Axios.get(
      'sap/opu/odata4/sap/zhrbc/default/sap/zhrbc_0720_react_utils/0001/IUser(%270%27)',
    );
    return user.data;
  } catch (e) {
    return rejectWithValue('Не удалось получить пользователя!');
  }
});

export const getToken = createAsyncThunk('user/getToken', async (_, { rejectWithValue }) => {
  try {
    const { headers } = await Axios.get(
      'sap/opu/odata4/sap/zlocal_service/default/sap/zhrbc_0720_react_utils/0001/IXCSRFToken',
      {
        headers: {
          'X-CSRF-Token': 'Fetch',
          // @ts-ignore
          ['cacheURL']: true,
        },
      },
    );
    return headers['x-csrf-token'];
  } catch (e) {
    return rejectWithValue('Не удалось получить токен!');
  }
});

export const getPermissions = createAsyncThunk(
  'user/permissions',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await Axios.get(
        'sap/opu/odata4/sap/zhrbc/default/sap/zhrbc_0720_react_utils/0001/IService',
      );
      return data.value;
    } catch (e) {
      return rejectWithValue('Не удалось получить доступы!');
    }
  },
);
