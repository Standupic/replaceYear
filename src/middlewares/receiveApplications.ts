import { createAsyncThunk } from '@reduxjs/toolkit';
import Axios from '../api/interceptor';

export interface IApplications {
  CurrentAmount: number;
  CurrentYear1: string;
  CurrentYear1Repl: boolean;
  CurrentYear2: string;
  CurrentYear2Repl: boolean;
  Id: string;
  NextAmount: number;
  NextYear1: string;
  NextYear2: string;
  anotherEmployer: boolean;
  createDateTime: string;
  currency: string;
  event: string;
  message: string;
  myRequest: boolean;
  reqId: string;
  scenarioStage: string;
  statusId: string;
  statusText: string;
}

const receiveApplications = createAsyncThunk<IApplications[], any, { rejectValue: any }>(
  'receiveApplications',
  async (_: {}, api) => {
    try {
      const applications = await Axios.get(
        'sap/opu/odata4/sap/zhrxss/default/sap/zhrxss_0837_req_yrep/0001/IYearReplacement',
        { headers: { 'Content-Type': 'application/json;odata.metadata=minimal;charset=utf-8' } },
      );
      return applications.data.value;
    } catch (e: any) {
      return api.rejectWithValue(e.response.data.error.details[0].message);
    }
  },
);

export default receiveApplications;
