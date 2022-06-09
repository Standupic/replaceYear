import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Variant } from 'juicyfront/types';
import receiveApplications, { IApplications } from '../middlewares/receiveApplications';
import { mappingApplications, mappingGetApplication } from '../helpers';
import getApplication, { IApplication } from '../middlewares/getApplication';
import { IUser } from '../types/user';

export enum PERMISSION_APPLICATIONS {
  NoApplications = 'NoApplications',
  SomeThingWrong = 'SomeThingWrong',
}

export interface IApplicationMapped {
  id: string;
  date: string;
  title: string;
  requestNumber: string;
  statusText: string;
  statusColor: Variant;
  user: IUser;
}

export interface ApplicationsState {
  applications: IApplicationMapped[] | undefined;
  loading: boolean;
  error: undefined | string[];
  accessApplications: PERMISSION_APPLICATIONS | undefined;
  viewApplication: IApplication;
  guid: string | undefined;
}

const initialState: ApplicationsState = {
  applications: undefined,
  loading: false,
  error: undefined,
  accessApplications: undefined,
  viewApplication: {} as IApplication,
  guid: undefined,
};

const applicationsSlice = createSlice({
  name: 'applications',
  initialState,
  reducers: {
    searching: (state, action: PayloadAction<string>) => {
      console.log(state);
    },
    viewApplication: (state, action: PayloadAction<string>) => {
      state.guid = action.payload;
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
    builder.addCase(getApplication.fulfilled, (state, action: PayloadAction<IApplication>) => {
      state.viewApplication = mappingGetApplication(action.payload);
      state.loading = false;
    });
    builder.addCase(getApplication.rejected, (state) => {
      state.loading = false;
      state.accessApplications = PERMISSION_APPLICATIONS.SomeThingWrong;
    });
    builder.addCase(getApplication.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(receiveApplications.rejected, (state) => {
      state.loading = false;
      state.accessApplications = PERMISSION_APPLICATIONS.SomeThingWrong;
    });
  },
});

export default applicationsSlice.reducer;
