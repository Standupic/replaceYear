import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Variant } from 'juicyfront/types';
import receiveApplications, { IApplications } from '../middlewares/receiveApplications';
import { mappingApplications } from '../helpers';

export enum PERMISSION_APPLICATIONS {
  NoApplications = 'NoApplications',
}

export interface IApplicationMapped {
  id: string;
  date: string;
  title: string;
  requestNumber: string;
  statusText: string;
  statusColor: Variant;
}

export interface ApplicationsState {
  applications: IApplicationMapped[] | undefined;
  loading: boolean;
  error: undefined | string[];
  accessApplications: PERMISSION_APPLICATIONS | undefined;
}

const initialState: ApplicationsState = {
  applications: undefined,
  loading: false,
  error: undefined,
  accessApplications: undefined,
};

const applicationsSlice = createSlice({
  name: 'applications',
  initialState,
  reducers: {
    searching: (state, action: PayloadAction<string>) => {
      console.log(state);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(receiveApplications.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      receiveApplications.fulfilled,
      (state, action: PayloadAction<IApplications[]>) => {
        state.loading = false;
        if (action.payload.length) {
          state.applications = mappingApplications(action.payload);
        } else {
          state.accessApplications = PERMISSION_APPLICATIONS.NoApplications;
        }
      },
    );
    builder.addCase(receiveApplications.rejected, (state) => {
      state.loading = false;
    });
  },
});

// export const { changeName } = userSlice.actions;
export default applicationsSlice.reducer;
