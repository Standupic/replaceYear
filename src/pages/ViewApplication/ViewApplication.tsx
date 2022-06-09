import React, { useEffect } from 'react';
import { PDFViewer } from 'juicyfront';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import User from '../../components/common/User';
import {Box, PadBox, Stack} from '../../components/styledComponents';
import { KEY_SPACING } from '../../components/styledComponents/constants';
import {
  selectLoadingApplications,
  selectViewApplication,
} from '../../selectors/applicationsSelector';
import ViewApplicationCard from '../../components/common/ViewApplicationCard';
import PagePreloader from '../../components/common/PagePreloader/PagePreloader';
import Permission from '../../components/Permission';
import getApplication from '../../middlewares/getApplication';
import MainTittle from "../../components/common/MainTittle";

const ViewApplication = () => {
  const viewApplication = useSelector(selectViewApplication);
  const {
    previousYear,
    beforePreviousYear,
    topActiveYear,
    bottomActiveYear,
    totalNotActive,
    totalActive,
    attachment,
  } = viewApplication;
  const loadingApplication = useSelector(selectLoadingApplications);
  const params = useParams<{ id: string }>();
  const dispatch = useDispatch();
  useEffect(() => {
    if (params && params.id) {
      dispatch(getApplication(params.id));
    }
  }, [dispatch, params.id, params]);
  return (
    <>
      <PagePreloader loader={loadingApplication}>
        <Stack as={PadBox} padding={[KEY_SPACING.lg, KEY_SPACING.zero, KEY_SPACING.zero]}>
          <User />
          <ViewApplicationCard
            previousYear={previousYear}
            beforePreviousYear={beforePreviousYear}
            bottomActiveYear={bottomActiveYear}
            topActiveYear={topActiveYear}
            totalNotActive={totalNotActive}
            totalActive={totalActive}
          />
          <PDFViewer file={attachment} />
        </Stack>
      </PagePreloader>
    </>
  );
};

export default ViewApplication;
