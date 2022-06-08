import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { IApplicationMapped } from '../store/applicationsSlice';
import { selectUser } from './userSelector';

export const selectGetApplications = (state: RootState) => state.applications.applications;
export const selectAccessApplications = (state: RootState) => state.applications.accessApplications;
export const selectViewApplication = (state: RootState) => state.applications.viewApplication;
export const selectLoadingApplications = (state: RootState) => state.applications.loading;

export const selectApplications = createSelector(
  selectGetApplications,
  selectUser,
  (items, user): IApplicationMapped[] => {
    return items?.reduce((acc: any, item) => {
      return [
        ...acc,
        {
          ...item,
          users: user,
        },
      ];
    }, []);
  },
);
