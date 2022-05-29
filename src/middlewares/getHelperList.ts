import { createAsyncThunk } from '@reduxjs/toolkit';
import Axios from '../api/interceptor';
import { IHelperList } from '../store/calculatorSlice';

const getHelperList = createAsyncThunk<IHelperList[], any, { rejectValue: string[] | undefined }>(
  'helperList',
  async (_, api) => {
    try {
      const user = await Axios.get(
        'sap/opu/odata4/sap/zhrxss/default/sap/zhrxss_0837_req_yrep/0001/IHelps(%27%27)?$expand=helpsYearsList',
      );
      return user.data.helpsYearsList;
    } catch (e) {
      return api.rejectWithValue(['Не удалось получить справочник']);
    }
  },
);

export default getHelperList;
