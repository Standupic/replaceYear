import { createAsyncThunk } from '@reduxjs/toolkit';
import Axios from '../api/interceptor';

export interface IRequestAttachment {
  id?: string;
  attType?: string;
  attTypeText?: string;
  fileName?: string;
  base64?: string;
  action?: string;
  singBase64?: string;
  cert?: string;
}

const getStatement = createAsyncThunk<IRequestAttachment, any, { rejectValue: any }>(
  'getStatement',
  async (id: string, api) => {
    try {
      const { data } = await Axios.get(
        `sap/opu/odata4/sap/zhrxss/default/sap/zhrxss_0837_req_yrep/0001/IYearReplacement(${id})?$expand=attachments,events,initiator`,
      );
      return data.attachments.reduce((acc: any, item: any) => {
        return { ...acc, ...item };
      }, {});
    } catch (e: any) {
      return api.rejectWithValue(e.response.data.error.details[0].message);
    }
  },
);

export default getStatement;
