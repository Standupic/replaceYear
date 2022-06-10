import React from 'react';
import { Button } from 'juicyfront';
import { useDispatch, useSelector } from 'react-redux';
import { PadBox, Stack, StickyButton } from '../../components/styledComponents';
import Permission from '../../components/Permission';
import { KEY_SPACING } from '../../components/styledComponents/constants';
import Calculator from '../../components/common/Calculator/Calculator';
import HasAlreadyOne from '../../components/common/HasAlreadyOne/HasAlreadyOne';
import { selectDelta } from '../../selectors/calculatorSelector';
import SwitcherToApply from '../../components/common/SwitcherToApply';
import User from '../../components/common/User';
import submitStatement from '../../middlewares/submitStatement';
import PagePreloader from '../../components/common/PagePreloader';
import { RootState } from '../../store';

const createApplication = () => {
  const {
    hasAlreadyOneMessage,
    statementAttachmentId,
    paramsAttachment,
    isSigned,
    submitLoading,
    initLoading,
  } = useSelector((state: RootState) => state.globalState);
  const delta = useSelector(selectDelta);
  const dispatch = useDispatch();
  return (
    <PagePreloader loader={initLoading}>
      <Permission mode={'create'}>
        <Stack as={PadBox} padding={[KEY_SPACING.lg, KEY_SPACING.zero, KEY_SPACING.zero]}>
          {hasAlreadyOneMessage ? (
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
        {!hasAlreadyOneMessage && (
          <StickyButton>
            <Button
              preloader={submitLoading}
              disabled={delta <= 0 || !isSigned}
              onClick={() => {
                dispatch(
                  submitStatement({
                    attachments: { ...paramsAttachment },
                    id: statementAttachmentId,
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
