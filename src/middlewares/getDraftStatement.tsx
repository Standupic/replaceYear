import { createAsyncThunk } from '@reduxjs/toolkit';
import Axios from '../api/interceptor';
import { mappingGetStatement } from '../helpers';

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

const getDraftStatement = createAsyncThunk<IAttachment, string, { rejectValue: any }>(
  'getDraftStatement',
  async (id, api) => {
    try {
      const { data } = await Axios.get(
        `sap/opu/odata4/sap/zhrxss/default/sap/zhrxss_0837_req_yrep/0001/IYearReplacement(${id})?$expand=attachments,events,initiator`,
      );
      return mappingGetStatement(data);
    } catch (e: any) {
      return api.rejectWithValue(e.response.data.error.details[0].message);
    }
  },
);

export default getDraftStatement;
