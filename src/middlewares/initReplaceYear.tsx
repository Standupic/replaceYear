import { createAsyncThunk } from '@reduxjs/toolkit';
import Axios from '../api/interceptor';

const initReplaceYear = createAsyncThunk('initReplaceYear', async (_, api) => {
  console.log('initReplaceYear');
  try {
    const user = await Axios.get(
      'sap/opu/odata4/sap/zhrxss/default/sap/zhrxss_0837_req_yrep/0001/IYearReplacementInit(%27%27)?$expand=initiator($expand=departmentsPath),events',
    );
    return user.data;
  } catch (e) {
    return api.rejectWithValue('Не удалось инициализировать заявку!');
  }
});

export default initReplaceYear;
