import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Variant } from 'juicyfront/types';
import receiveApplications, { IApplications } from '../middlewares/receiveApplications';
import { mappingApplications, mappingGetApplication } from '../helpers';
import getApplication from '../middlewares/getApplication';
import { IUser } from '../types/user';
import { IScenarioStage } from '../components/common/ApplicationCard/ApplicationCard';
import searchingApplications from '../middlewares/searchingApplications';
import { IAttachment } from '../middlewares/getStatement';
import deleteDraft from '../middlewares/deleteDraft';
import getEditedDraftStatement from '../middlewares/getEditedDraftStatement';
import { reset } from './globalStateSlice';

export enum PERMISSION_APPLICATIONS {
  NoApplications = 'NoApplications',
  SomeThingWrong = 'SomeThingWrong',
}

export enum STATUS_DRAFT_APPLICATION {
  Error = 'Error',
  Success = 'Success',
}

export interface IApplicationMapped {
  previousYear: string;
  beforePreviousYear: string;
  topActiveYear: string;
  bottomActiveYear: string;
  totalNotActive: number;
  totalActive: number;
  attachment: IAttachment;
  scenarioStage: string;
  id: string;
  timeStamp: number;
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
  timeStamp: number;
}

export interface ApplicationsState {
  applications: IApplicationsMapped[] | undefined;
  loading: boolean;
  error: undefined | string[];
  accessApplications: PERMISSION_APPLICATIONS | undefined;
  currentApplication: IApplicationMapped;
  filterDate: { from: number; to: number; value: string } | undefined;
  statusDraftApplication: STATUS_DRAFT_APPLICATION | undefined;
}

const initialState: ApplicationsState = {
  applications: undefined,
  loading: false,
  error: undefined,
  accessApplications: undefined,
  currentApplication: {} as IApplicationMapped,
  filterDate: undefined,
  statusDraftApplication: undefined,
};

const applicationsSlice = createSlice({
  name: 'applications',
  initialState,
  reducers: {
    setFilterDate: (
      state: ApplicationsState,
      action: PayloadAction<{ from: number; to: number; value: string }>,
    ) => {
      if (action.payload) {
        state.filterDate = action.payload;
      }
    },
    resetCurrentApplication: (state: ApplicationsState) => {
      state.currentApplication = {} as IApplicationMapped;
    },
    setStatusDraftApplication: (
      state: ApplicationsState,
      action: PayloadAction<STATUS_DRAFT_APPLICATION | undefined>,
    ) => {
      state.statusDraftApplication = action.payload;
    },
    setAccessApplications: (
      state: ApplicationsState,
      action: PayloadAction<PERMISSION_APPLICATIONS | undefined>,
    ) => {
      state.accessApplications = action.payload;
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
      (state: ApplicationsState, action: PayloadAction<any>) => {
        state.currentApplication = mappingGetApplication(action.payload);
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
    builder.addCase(
      getEditedDraftStatement.fulfilled,
      (state: ApplicationsState, action: PayloadAction<IAttachment>) => {
        if (state.currentApplication) {
          state.currentApplication.attachment = action.payload;
        }
      },
    );
    builder.addCase(searchingApplications.pending, (state: ApplicationsState) => {
      state.loading = true;
    });
    builder.addCase(searchingApplications.rejected, (state: ApplicationsState) => {
      state.loading = false;
    });
    builder.addCase(deleteDraft.fulfilled, (state: ApplicationsState) => {
      state.loading = false;
      state.statusDraftApplication = STATUS_DRAFT_APPLICATION.Success;
    });
    builder.addCase(deleteDraft.pending, (state: ApplicationsState) => {
      state.loading = true;
    });
    builder.addCase(deleteDraft.rejected, (state: ApplicationsState) => {
      state.loading = false;
      state.statusDraftApplication = STATUS_DRAFT_APPLICATION.Error;
    });
    builder.addCase(reset, () => {
      return initialState;
    });
  },
});

export const {
  setFilterDate,
  resetCurrentApplication,
  setStatusDraftApplication,
  setAccessApplications,
} = applicationsSlice.actions;
export default applicationsSlice.reducer;
