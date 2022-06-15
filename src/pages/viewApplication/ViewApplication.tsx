import React, { useEffect } from 'react';
import { PDFViewer } from 'juicyfront';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import User from '../../components/common/User';
import { PadBox, Stack } from '../../components/styledComponents';
import { KEY_SPACING } from '../../components/styledComponents/constants';
import {
  selectLoadingApplications,
  selectCurrentApplication,
} from '../../selectors/applicationsSelector';
import ViewApplicationCard from '../../components/common/ViewApplicationCard';
import PagePreloader from '../../components/common/PagePreloader/PagePreloader';
import getApplication from '../../middlewares/getApplication';
import { resetCurrentApplication } from '../../store/applicationsSlice';
import MainTittle from '../../components/common/MainTittle';

const ViewApplication = () => {
  const currentApplication = useSelector(selectCurrentApplication);
  const {
    previousYear,
    beforePreviousYear,
    topActiveYear,
    bottomActiveYear,
    totalNotActive,
    totalActive,
    attachment,
    timeStamp,
  } = currentApplication;
  const loadingApplication = useSelector(selectLoadingApplications);
  const params = useParams<{ id: string }>();
  const dispatch = useDispatch();
  useEffect(() => {
    if (params && params.id) {
      dispatch(getApplication({ id: params.id }));
    }
    return () => {
      dispatch(resetCurrentApplication());
    };
  }, [dispatch, params.id, params]);
  return (
    <>
      <PagePreloader loader={loadingApplication}>
        <Stack as={PadBox} padding={[KEY_SPACING.lg, KEY_SPACING.zero, KEY_SPACING.zero]}>
          <MainTittle
            text={`Заявка на замену лет для расчёта больничного на ${new Date(
              timeStamp,
            ).getFullYear()} год от ${new Date(timeStamp).toLocaleDateString()}`}
          />
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
