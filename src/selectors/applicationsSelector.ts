import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

export const selectGetApplications = (state: RootState) => state.applications.applications;
export const selectAccessApplications = (state: RootState) => state.applications.accessApplications;
export const selectCurrentApplication = (state: RootState) => state.applications.currentApplication;
export const selectLoadingApplications = (state: RootState) => state.applications.loading;
export const selectFilterDate = (state: RootState) => state.applications.filterDate;

export const selectFilteredDate = createSelector(
  selectGetApplications,
  selectFilterDate,
  (applications, filterDate) => {
    if (filterDate?.value && applications) {
      return applications.filter((item) => {
        if (filterDate) {
          return (
            (item.timeStamp >= filterDate.from && item.timeStamp <= filterDate.to) ||
            item.date === new Date(filterDate.from).toLocaleDateString() ||
            item.date === new Date(filterDate.to).toLocaleDateString()
          );
        }
        return item;
      });
    } else {
      return applications;
    }
  },
);
