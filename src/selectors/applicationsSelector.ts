import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

export const selectGetApplications = (state: RootState) => state.applications.applications;
export const selectAccessApplications = (state: RootState) => state.applications.accessApplications;
export const selectViewApplication = (state: RootState) => state.applications.viewApplication;
export const selectLoadingApplications = (state: RootState) => state.applications.loading;
export const selectFilterDate = (state: RootState) => state.applications.filterDate;

export const selectFilteredDate = createSelector(
  selectGetApplications,
  selectFilterDate,
  (applications, filterDate) => {
    if (filterDate?.value && applications) {
      return applications.filter((item) => {
        if (filterDate) {
          return item.timeStamp >= filterDate.from && item.timeStamp <= filterDate.to;
        }
        return item;
      });
    } else {
      return applications;
    }
  },
);
