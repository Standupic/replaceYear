import { createAsyncThunk } from '@reduxjs/toolkit';
import Axios from '../api/interceptor';
import { ACCESS_APPLICATION } from '../store/globalStateSlice';
import { InitData } from './initReplaceYear';

const getInitMessage = createAsyncThunk<
  string,
  {},
  { rejectValue: ACCESS_APPLICATION | undefined }
>('getInitMessage', async (_, api) => {
  try {
    const { data } = await Axios.get<InitData>(
      'sap/opu/odata4/sap/zhrxss/default/sap/zhrxss_0837_req_yrep/0001/IYearReplacementInit(%27%27)?$expand=initiator($expand=departmentsPath),events',
    );
    return data.message;
  } catch (e: any) {
    return api.rejectWithValue(e.response.data.error.details[0].message);
  }
});

export default getInitMessage;
