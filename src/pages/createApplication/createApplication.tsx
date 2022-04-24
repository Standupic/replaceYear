import React from 'react';
import { Card } from '../../components/common/Tags';
import Permission from '../../components/Permission';
import PadBox from '../../components/styledComponents/PadBox';
import { KEY_SPACING } from '../../components/styledComponents/constants';
import Stack from '../../components/styledComponents/Stack';

const createApplication = () => {
  return (
    <Permission>
      <PadBox padding={[KEY_SPACING.lg, KEY_SPACING.zero, KEY_SPACING.zero]}>
        <Stack>
          <Card>
            <p>Section1</p>
          </Card>
          <Card>
            <p>Section2</p>
          </Card>
          <Card>
            <p>Section3</p>
          </Card>
        </Stack>
      </PadBox>
    </Permission>
  );
};

export default createApplication;
