import { createAsyncThunk } from '@reduxjs/toolkit';
import Axios from '../api/interceptor';

export const getUser = createAsyncThunk('users/getUser', async (_, { rejectWithValue }) => {
  try {
    if (process.env['REACT_APP_GET_USER']) {
      const user = await Axios.get(process.env['REACT_APP_GET_USER']);
      return user.data;
    }
  } catch (e) {
    return rejectWithValue('Не удалось получить пользователя!');
  }
});

export const getToken = createAsyncThunk('user/getToken', async (_, { rejectWithValue }) => {
  try {
    if (process.env['REACT_APP_GET_TOKEN']) {
      const { headers } = await Axios.get(process.env['REACT_APP_GET_TOKEN'], {
        headers: {
          'X-CSRF-Token': 'Fetch',
          // @ts-ignore
          ['cacheURL']: true,
        },
      });
      return headers['x-csrf-token'];
    }
  } catch (e) {
    return rejectWithValue('Не удалось получить токен!');
  }
});

export const getPermissions = createAsyncThunk(
  'user/permissions',
  async (_, { rejectWithValue }) => {
    try {
      if (process.env['REACT_APP_GET_USER_PERMISSIONS']) {
        const { data } = await Axios.get(process.env['REACT_APP_GET_USER_PERMISSIONS']);
        if (data) {
          return data.value;
        }
      }
    } catch (e) {
      return rejectWithValue('Не удалось получить доступы!');
    }
  },
);
