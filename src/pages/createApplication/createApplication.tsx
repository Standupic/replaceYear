import React from 'react';
import { Card, PadBox, Stack } from '../../components/styledComponents';
import Permission from '../../components/Permission';
import { KEY_SPACING } from '../../components/styledComponents/constants';
import Calculator from '../../components/common/Calculator/Calculator';

const createApplication = () => {
  return (
    <Permission>
      <Stack as={PadBox} padding={[KEY_SPACING.lg, KEY_SPACING.zero, KEY_SPACING.zero]}>
        <Card>
          <Calculator />
        </Card>
      </Stack>
    </Permission>
  );
};

export default createApplication;
