import { createAsyncThunk } from '@reduxjs/toolkit';
import Axios from '../api/interceptor';

export interface IAttachment {
  id?: string;
  attType?: string;
  attTypeText?: string;
  fileName: string;
  base64: string;
  action?: string;
  singBase64?: string;
  cert?: string;
}

const getStatement = createAsyncThunk<IAttachment, any, { rejectValue: any }>(
  'getStatement',
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

export default getStatement;
export type IGetStatement = ReturnType<typeof getStatement>;
