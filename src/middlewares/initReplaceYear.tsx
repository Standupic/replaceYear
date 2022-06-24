import { createAsyncThunk } from '@reduxjs/toolkit';
import Axios from '../api/interceptor';
import { ACCESS_APPLICATION } from '../store/globalStateSlice';
import { IUser } from '../types/user';

interface IEvent {
  event: string;
  text: string;
}

export interface InitData {
  CurrentAmount: number;
  CurrentYear1: string;
  CurrentYear1Repl: boolean;
  CurrentYear2: string;
  CurrentYear2Repl: boolean;
  Id: string;
  anotherEmployer: boolean;
  createDateTime: number;
  currency: string;
  event: string;
  events: IEvent;
  initiator: IUser;
  message: string;
  myRequest: boolean;
  reqId: string;
  scenarioStage: string;
  statusId: string;
  statusText: string;
}

const initReplaceYear = createAsyncThunk<InitData, {}, { rejectValue: ACCESS_APPLICATION }>(
  'initReplaceYear',
  async (_, api) => {
    try {
      const { data } = await Axios.get<InitData>(
        'sap/opu/odata4/sap/zhrxss/default/sap/zhrxss_0837_req_yrep/0001/IYearReplacementInit(%27%27)?$expand=initiator($expand=departmentsPath),events',
      );
      return data;
    } catch (e: any) {
      return api.rejectWithValue(e.response.data.error.details[0].message);
    }
  },
);

export default initReplaceYear;
