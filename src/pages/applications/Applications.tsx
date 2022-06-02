import React from 'react';
import { Card, PadBox, Stack } from '../../components/styledComponents';
import { KEY_SPACING } from '../../components/styledComponents/constants';
import useReceiveApplications from '../../hooks/useRecieveApplications';

const Applications = () => {
  useReceiveApplications();
  return (
    <Stack as={PadBox} padding={[KEY_SPACING.lg, KEY_SPACING.zero, KEY_SPACING.zero]}>
      <Card>
        <p>Applications</p>
      </Card>
    </Stack>
  );
};

export default Applications;
