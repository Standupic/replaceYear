import { createAsyncThunk } from '@reduxjs/toolkit';
import Axios from '../api/interceptor';

const getHelperList = createAsyncThunk('helperList', async (_, api) => {
  console.log('helperList');
  try {
    const user = await Axios.get(
      'sap/opu/odata4/sap/zhrxss/default/sap/zhrxss_0837_req_yrep/0001/IHelps(%27%27)?$expand=helpsYearsList',
    );
    return user.data;
  } catch (e) {
    return api.rejectWithValue('Не удалось получить справочник');
  }
});

export default getHelperList;
