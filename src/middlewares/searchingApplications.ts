import { createAsyncThunk } from '@reduxjs/toolkit';
import Axios from '../api/interceptor';
import { ACCESS_APPLICATION } from '../store/globalStateSlice';

const searchingApplications = createAsyncThunk<any, any, { rejectValue: ACCESS_APPLICATION }>(
  'searchingApplications',
  async (str: string, api) => {
    try {
      const { data } = await Axios.get(
        `sap/opu/odata4/sap/zhrxss/default/sap/zhrxss_0837_req_yrep/0001/IYearReplacement?$search=${str}`,
      );
      return data.value;
    } catch (e: any) {
      return api.rejectWithValue(e.response.data.error.details[0].message);
    }
  },
);

export default searchingApplications;
