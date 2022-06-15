import { createAsyncThunk } from '@reduxjs/toolkit';
import Axios from '../api/interceptor';

const getApplication = createAsyncThunk<any, any, { rejectValue: string }>(
  'getApplication',
  async (props: { id: string; isDraft?: boolean }, api) => {
    try {
      const { data } = await Axios.get(
        `sap/opu/odata4/sap/zhrxss/default/sap/zhrxss_0837_req_yrep/0001/IYearReplacement(${props.id})?$expand=attachments,events,initiator`,
      );
      return data;
    } catch (e: any) {
      return api.rejectWithValue(e.response.data.error.details[0].message);
    }
  },
);

export default getApplication;
