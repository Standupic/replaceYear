import { RootState } from '../store';

export const selectGetApplications = (state: RootState) => state.applications.applications;
export const selectAccessApplications = (state: RootState) => state.applications.accessApplications;
export const selectViewApplication = (state: RootState) => state.applications.viewApplication;
export const selectLoadingApplications = (state: RootState) => state.applications.loading;
