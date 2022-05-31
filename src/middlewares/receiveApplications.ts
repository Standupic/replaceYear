import { createAsyncThunk } from '@reduxjs/toolkit';
import Axios from '../api/interceptor';

const receiveApplications = createAsyncThunk<any, any, { rejectValue: any }>(
  'formStatement',
  async (_: {}, api) => {
    try {
      const applications = await Axios.get(
        'sap/opu/odata4/sap/zhrxss/default/sap/zhrxss_0837_req_yrep/0001/IYearReplacement',
        { headers: { 'Content-Type': 'application/json;odata.metadata=minimal;charset=utf-8' } },
      );
      console.log(applications);
      return applications.data;
    } catch (e: any) {
      return api.rejectWithValue(e.response.data.error.details[0].message);
    }
  },
);

export default receiveApplications;
