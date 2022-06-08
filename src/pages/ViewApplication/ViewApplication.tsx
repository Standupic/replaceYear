import React from 'react';
import { PDFViewer } from 'juicyfront';
import { useSelector } from 'react-redux';
import User from '../../components/common/User';
import { PadBox, Stack } from '../../components/styledComponents';
import { KEY_SPACING } from '../../components/styledComponents/constants';
import {
  selectLoadingApplications,
  selectViewApplication,
} from '../../selectors/applicationsSelector';
import ViewApplicationCard from '../../components/common/ViewApplicationCard';
import PagePreloader from '../../components/common/PagePreloader/PagePreloader';
import Permission from '../../components/Permission';

const ViewApplication = () => {
  const viewApplication = useSelector(selectViewApplication);
  const loadingApplication = useSelector(selectLoadingApplications);
  const { attachment } = viewApplication;
  return (
    <>
      <PagePreloader loader={loadingApplication}>
        <Permission mode={'applications'}>
          <Stack as={PadBox} padding={[KEY_SPACING.lg, KEY_SPACING.zero, KEY_SPACING.zero]}>
            <User />
            <ViewApplicationCard />
            <PDFViewer file={attachment} />
          </Stack>
        </Permission>
      </PagePreloader>
    </>
  );
};

export default ViewApplication;
