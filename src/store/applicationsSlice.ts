import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Variant } from 'juicyfront/types';
import receiveApplications, { IApplications } from '../middlewares/receiveApplications';
import { mappingApplications, mappingGetApplication } from '../helpers';
import getApplication, { IApplication } from '../middlewares/getApplication';
import { IUser } from '../types/user';
import { IScenarioStage } from '../components/common/ApplicationCard/ApplicationCard';
import searchingApplications from '../middlewares/searchingApplications';
import { InitData } from './globalStateSlice';

export enum PERMISSION_APPLICATIONS {
  NoApplications = 'NoApplications',
  SomeThingWrong = 'SomeThingWrong',
}

export interface IApplicationsMapped {
  id: string;
  date: string;
  title: string;
  requestNumber: string;
  statusText: string;
  statusColor: Variant;
  user: IUser;
  scenarioStage: IScenarioStage;
  initData: InitData & { id?: string; topActiveYear: number; bottomActiveYear: number };
}

export interface ApplicationsState {
  applications: IApplicationsMapped[] | undefined;
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
    viewApplication: (state: ApplicationsState, action: PayloadAction<string>) => {
      state.guid = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(receiveApplications.pending, (state: ApplicationsState) => {
      state.loading = true;
    });
    builder.addCase(
      receiveApplications.fulfilled,
      (state: ApplicationsState, action: PayloadAction<IApplications[]>) => {
        state.loading = false;
        if (action.payload.length) {
          state.applications = mappingApplications(action.payload);
          state.accessApplications = undefined;
        } else {
          state.accessApplications = PERMISSION_APPLICATIONS.NoApplications;
        }
      },
    );
    builder.addCase(receiveApplications.rejected, (state: ApplicationsState) => {
      state.loading = false;
      state.accessApplications = PERMISSION_APPLICATIONS.SomeThingWrong;
    });
    builder.addCase(
      getApplication.fulfilled,
      (state: ApplicationsState, action: PayloadAction<IApplication>) => {
        state.viewApplication = mappingGetApplication(action.payload);
        state.loading = false;
      },
    );
    builder.addCase(getApplication.rejected, (state: ApplicationsState) => {
      state.loading = false;
      state.accessApplications = PERMISSION_APPLICATIONS.SomeThingWrong;
    });
    builder.addCase(getApplication.pending, (state: ApplicationsState) => {
      state.loading = true;
    });
    builder.addCase(
      searchingApplications.fulfilled,
      (state: ApplicationsState, action: PayloadAction<IApplications[]>) => {
        state.loading = false;
        if (action.payload.length) {
          state.applications = mappingApplications(action.payload);
        } else {
          state.accessApplications = PERMISSION_APPLICATIONS.NoApplications;
        }
      },
    );
    builder.addCase(searchingApplications.pending, (state: ApplicationsState) => {
      state.loading = true;
    });
    builder.addCase(searchingApplications.rejected, (state: ApplicationsState) => {
      state.loading = false;
    });
  },
});

export default applicationsSlice.reducer;
