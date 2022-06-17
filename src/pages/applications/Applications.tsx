import React from 'react';
import { useSelector } from 'react-redux';
import { PadBox, Stack } from '../../components/styledComponents';
import { KEY_SPACING } from '../../components/styledComponents/constants';
import useReceiveApplications from '../../hooks/useRecieveApplications';
import Permission from '../../components/Permission';
import ApplicationCard from '../../components/common/ApplicationCard';
import { IApplicationsMapped, PERMISSION_APPLICATIONS } from '../../store/applicationsSlice';
import Filters from '../../components/common/Filters';
import PagePreloader from '../../components/common/PagePreloader';
import { RootState } from '../../store';
import { selectFilteredDate } from '../../selectors/applicationsSelector';
import SomethingWrong from '../../components/SomethingWrong';
import {
  HeadingValuesApplications,
  TextValuesApplications,
} from '../../components/Permission/Permission';

const Applications = () => {
  useReceiveApplications();
  const { loading } = useSelector((state: RootState) => state.applications);
  const applications = useSelector(selectFilteredDate);
  const data = applications?.map((item: IApplicationsMapped) => {
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
        scenarioStage={item.scenarioStage}
        timeStamp={item.timeStamp}
      />
    );
  });
  return (
    <Stack as={PadBox} padding={[KEY_SPACING.lg, KEY_SPACING.zero, KEY_SPACING.zero]}>
      <Filters />
      <PagePreloader loader={loading}>
        <Permission mode={'applications'}>
          {data && data.length ? (
            data
          ) : (
            <SomethingWrong
              heading={HeadingValuesApplications[PERMISSION_APPLICATIONS.NoApplications]}
              text={TextValuesApplications[PERMISSION_APPLICATIONS.NoApplications]}
            />
          )}
        </Permission>
      </PagePreloader>
    </Stack>
  );
};

export default Applications;
