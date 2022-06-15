import { createAsyncThunk } from '@reduxjs/toolkit';
import Axios from '../api/interceptor';

const deleteDraft = createAsyncThunk<any, any, { rejectValue: any }>(
  'deleteDraft',
  async (props: { id: string }, api) => {
    try {
      const init = await Axios.post(
        `sap/opu/odata4/sap/zhrxss/default/sap/zhrxss_0837_req_yrep/0001/IYearReplacement`,
        {
          Id: props.id,
          event: 'DELETE',
        },
      );
      return init.data;
    } catch (e: any) {
      return api.rejectWithValue(e.response.data.error.details[0].message);
    }
  },
);

export default deleteDraft;
