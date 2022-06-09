import React from 'react';
import { Button } from 'juicyfront';
import { useDispatch, useSelector } from 'react-redux';
import { Box, PadBox, Stack, StickyButton } from '../../components/styledComponents';
import Permission from '../../components/Permission';
import { KEY_SPACING } from '../../components/styledComponents/constants';
import Calculator from '../../components/common/Calculator/Calculator';
import HasAlreadyOne from '../../components/common/HasAlreadyOne/HasAlreadyOne';
import {
  selectAttachmentId,
  selectHasAlreadyOneMessage,
  selectInitLoading,
  selectIsSigned,
  selectParamsAttachment,
  selectSubmitLoading,
} from '../../selectors/globalSelector';
import { selectDelta } from '../../selectors/calculatorSelector';
import SwitcherToApply from '../../components/common/SwitcherToApply';
import User from '../../components/common/User';
import submitStatement from '../../middlewares/submitStatement';
import NavigationTabs from '../../components/common/NavigationTabs';
import PagePreloader from '../../components/common/PagePreloader';

const createApplication = () => {
  const hasAlreadyOne = useSelector(selectHasAlreadyOneMessage);
  const attachmentId = useSelector(selectAttachmentId);
  const delta = useSelector(selectDelta);
  const paramsAttachment = useSelector(selectParamsAttachment);
  const isSigned = useSelector(selectIsSigned);
  const submitLoading = useSelector(selectSubmitLoading);
  const dispatch = useDispatch();
  const initLoading = useSelector(selectInitLoading);
  return (
    <PagePreloader loader={initLoading}>
      <Permission mode={'create'}>
        <Stack as={PadBox} padding={[KEY_SPACING.lg, KEY_SPACING.zero, KEY_SPACING.zero]}>
          {hasAlreadyOne ? (
            <>
              <User />
              <HasAlreadyOne />
            </>
          ) : (
            <>
              <User />
              <Calculator />
              <SwitcherToApply />
            </>
          )}
        </Stack>
        {!hasAlreadyOne && (
          <StickyButton>
            <Button
              preloader={submitLoading}
              disabled={delta <= 0 || !isSigned}
              onClick={() => {
                dispatch(
                  submitStatement({
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
    </PagePreloader>
  );
};

export default createApplication;
