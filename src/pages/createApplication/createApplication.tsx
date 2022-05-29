import React from 'react';
import { Button } from 'juicyfront';
import { useDispatch, useSelector } from 'react-redux';
import { PadBox, Stack, StickyButton } from '../../components/styledComponents';
import Permission from '../../components/Permission';
import { KEY_SPACING } from '../../components/styledComponents/constants';
import Calculator from '../../components/common/Calculator/Calculator';
import HasAlreadyOne from '../../components/common/HasAlreadyOne/HasAlreadyOne';
import {
  selectAttachmentId,
  selectHasAlreadyOneMessage,
  selectParamsAttachment,
} from '../../selectors/globalSelector';
import { selectDelta } from '../../selectors/calculatorSelector';
import SwitcherToApply from '../../components/common/SwitcherToApply';
import submitManually from '../../middlewares/submitManually';

const createApplication = () => {
  const hasAlreadyOne = useSelector(selectHasAlreadyOneMessage);
  const attachmentId = useSelector(selectAttachmentId);
  const delta = useSelector(selectDelta);
  const paramsAttachment = useSelector(selectParamsAttachment);
  const dispatch = useDispatch();
  return (
    <Permission>
      <Stack as={PadBox} padding={[KEY_SPACING.lg, KEY_SPACING.zero, KEY_SPACING.zero]}>
        {hasAlreadyOne ? (
          <HasAlreadyOne />
        ) : (
          <>
            <Calculator />
            <SwitcherToApply />
          </>
        )}
      </Stack>
      {!hasAlreadyOne && (
        <StickyButton>
          <Button
            disabled={delta <= 0}
            onClick={() => {
              dispatch(
                submitManually({
                  attachments: { ...paramsAttachment },
                  id: attachmentId,
                }),
              );
            }}>
            Отправить
          </Button>
        </StickyButton>
      )}
    </Permission>
  );
};

export default createApplication;
