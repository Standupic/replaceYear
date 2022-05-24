import React from 'react';
import { Button } from 'juicyfront';
import { useSelector } from 'react-redux';
import { PadBox, Stack, StickyButton } from '../../components/styledComponents';
import Permission from '../../components/Permission';
import { KEY_SPACING } from '../../components/styledComponents/constants';
import Calculator from '../../components/common/Calculator/Calculator';
import ToApply from '../../components/common/ToApply/ToApply';
import HasAlreadyOne from '../../components/common/HasAlreadyOne/HasAlreadyOne';
import { selectHasAlreadyOneMessage } from '../../selectors/globalSelector';
import { selectDelta } from '../../selectors/calculatorSelector';

const createApplication = () => {
  const hasAlreadyOne = useSelector(selectHasAlreadyOneMessage);
  const delta = useSelector(selectDelta);
  return (
    <Permission>
      <Stack as={PadBox} padding={[KEY_SPACING.lg, KEY_SPACING.zero, KEY_SPACING.zero]}>
        {hasAlreadyOne ? (
          <HasAlreadyOne />
        ) : (
          <>
            <Calculator />
            <ToApply />
          </>
        )}
      </Stack>
      {!hasAlreadyOne && (
        <StickyButton>
          <Button disabled={delta < 0}>Отправить</Button>
        </StickyButton>
      )}
    </Permission>
  );
};

export default createApplication;
