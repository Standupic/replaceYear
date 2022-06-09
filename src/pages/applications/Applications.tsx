import React from 'react';
import { useSelector } from 'react-redux';
import { PadBox, Stack } from '../../components/styledComponents';
import { KEY_SPACING } from '../../components/styledComponents/constants';
import useReceiveApplications from '../../hooks/useRecieveApplications';
import Permission from '../../components/Permission';
import ApplicationCard from '../../components/common/ApplicationCard';
import {
  selectGetApplications,
  selectLoadingApplications,
} from '../../selectors/applicationsSelector';
import { IApplicationMapped } from '../../store/applicationsSlice';
import Filters from '../../components/common/Filters';
import PagePreloader from '../../components/common/PagePreloader';

const Applications = () => {
  useReceiveApplications();
  const applications = useSelector(selectGetApplications);
  const loadingApplication = useSelector(selectLoadingApplications);
  const data = applications?.map((item: IApplicationMapped) => {
    return (
      <ApplicationCard
        key={item.id}
        id={item.id}
        requestNumber={item.requestNumber}
        statusColor={item.statusColor}
        statusText={item.statusText}
        title={item.title}
        date={item.date}
        user={item.user}
      />
    );
  });
  return (
    <PagePreloader loader={loadingApplication}>
      <Permission mode={'applications'}>
        <Stack as={PadBox} padding={[KEY_SPACING.lg, KEY_SPACING.zero, KEY_SPACING.zero]}>
          <Filters />
          {data}
        </Stack>
      </Permission>
    </PagePreloader>
  );
};

export default Applications;
