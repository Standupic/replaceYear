import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

export const selectStatusApplication = (state: RootState) => state.globalState.statusApplication;

export const selectAccessApplication = (state: RootState) => state.globalState.accessApplication;

export const selectFormingApplicationLoading = (state: RootState) =>
  state.globalState.formStatementLoading;

export const selectAttachmentId = (state: RootState) => state.globalState.attachmentId;

export const selectPdfFileLoading = (state: RootState) => state.globalState.pdfFileLoading;

export const selectCurrentDate = (state: RootState) => state.globalState.date;

export const selectIsSigned = (state: RootState) => state.globalState.isSigned;

export const selectSubmitLoading = (state: RootState) => state.globalState.submitLoading;

export const selectIsVisibleFormStatement = (state: RootState) =>
  state.globalState.isVisibleFormStatement;

export const formingLoading = createSelector(selectFormingApplicationLoading, (loading) => loading);
