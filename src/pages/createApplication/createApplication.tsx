import React from 'react';
import { Button } from 'juicyfront';
import { PadBox, Stack, StickyButton } from '../../components/styledComponents';
import Permission from '../../components/Permission';
import { KEY_SPACING } from '../../components/styledComponents/constants';
import Calculator from '../../components/common/Calculator/Calculator';
import ToApply from '../../components/common/ToApply/ToApply';

const createApplication = () => {
  return (
    <Permission>
      <Stack as={PadBox} padding={[KEY_SPACING.lg, KEY_SPACING.zero, KEY_SPACING.zero]}>
        <Calculator />
        <ToApply />
      </Stack>
      <StickyButton>
        <Button>Отправить</Button>
      </StickyButton>
    </Permission>
  );
};

export default createApplication;
