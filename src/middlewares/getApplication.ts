import { createAsyncThunk } from '@reduxjs/toolkit';
import Axios from '../api/interceptor';
import { IRequestAttachment } from './getStatement';

export interface IApplication {
  previousYear: string;
  beforePreviousYear: string;
  topActiveYear: string;
  bottomActiveYear: string;
  totalNotActive: number;
  totalActive: number;
  attachment: IRequestAttachment;
}

const getApplication = createAsyncThunk<IApplication, any, { rejectValue: string }>(
  'getApplication',
  async (id: string, api) => {
    try {
      const { data } = await Axios.get(
        `sap/opu/odata4/sap/zhrxss/default/sap/zhrxss_0837_req_yrep/0001/IYearReplacement(${id})?$expand=attachments,events,initiator`,
      );
      return data;
    } catch (e: any) {
      return api.rejectWithValue(e.response.data.error.details[0].message);
    }
  },
);

export default getApplication;
