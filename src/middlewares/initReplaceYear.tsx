import { createAsyncThunk } from '@reduxjs/toolkit';
import Axios from '../api/interceptor';
import { ACCESS_APPLICATION } from '../store/globalStateSlice';

const initReplaceYear = createAsyncThunk<any, any, { rejectValue: ACCESS_APPLICATION }>(
  'initReplaceYear',
  async (_: {}, api) => {
    try {
      const init = await Axios.get(
        'sap/opu/odata4/sap/zhrxss/default/sap/zhrxss_0837_req_yrep/0001/IYearReplacementInit(%27%27)?$expand=initiator($expand=departmentsPath),events',
      );
      return init.data;
    } catch (e: any) {
      return api.rejectWithValue(e.response.data.error.details[0].message);
    }
  },
);

export default initReplaceYear;
