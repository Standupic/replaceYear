import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { IApplications } from '../middlewares/receiveApplications';
import { IApplicationMapped } from '../store/applicationsSlice';
import { selectPreviousTwoYears } from './calculatorSelector';
import { selectUser } from './userSelector';

export const selectGetApplications = (state: RootState) => state.applications.applications;
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
