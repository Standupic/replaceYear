import { createAsyncThunk } from '@reduxjs/toolkit';
import Axios from '../api/interceptor';
import { IRequestAttachment } from './getStatement';

interface IPropsSubmit {
  attachments: ISubmitManually;
  id: string;
}

interface ISubmitManually {
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
  attachments: IRequestAttachment[];
}

const submitManually = createAsyncThunk<any, any, { rejectValue: any }>(
  'submitManually',
  async (props: IPropsSubmit, api) => {
    try {
      const init = await Axios.post(
        `sap/opu/odata4/sap/zhrxss/default/sap/zhrxss_0837_req_yrep/0001/IYearReplacement`,
        {
          Id: props.id,
          attachments: [props.attachments],
        },
        { headers: { 'Content-Type': 'application/json;odata.metadata=minimal;charset=utf-8' } },
      );
      return init.data;
    } catch (e: any) {
      return api.rejectWithValue(e.response.data.error.details[0].message);
    }
  },
);

export default submitManually;
