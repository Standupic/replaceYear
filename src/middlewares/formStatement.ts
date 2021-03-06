import { createAsyncThunk } from '@reduxjs/toolkit';
import Axios from '../api/interceptor';

interface IStatementParams {
  reqId: string;
  statusId: string;
  CurrentYear1: string;
  CurrentYear1Repl: boolean;
  CurrentYear2: string;
  CurrentYear2Repl: boolean;
  NextYear1: string;
  NextYear2: string;
  CurrentAmount: number;
  NextAmount: number;
  currency: string;
  event: string;
  Id?: string;
}

const formStatement = createAsyncThunk<any, any, { rejectValue: any }>(
  'formStatement',
  async (params: IStatementParams, api) => {
    try {
      const { data } = await Axios.post(
        'sap/opu/odata4/sap/zhrxss/default/sap/zhrxss_0837_req_yrep/0001/IYearReplacement',
        {
          ...params,
        },
      );
      return data;
    } catch (e: any) {
      return api.rejectWithValue(e.response.data.error.details[0].message);
    }
  },
);

export default formStatement;
