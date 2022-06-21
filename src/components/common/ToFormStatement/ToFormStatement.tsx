import React, { FC } from 'react';
import { Button, Hint } from 'juicyfront';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Card, Heading, Stack } from '../../styledComponents';
import formStatement from '../../../middlewares/formStatement';
import { selectDelta, selectParamsApplication } from '../../../selectors/calculatorSelector';
import { formingLoading, selectAttachmentId } from '../../../selectors/globalSelector';
import editDraftStatement from '../../../middlewares/editDraft';

export interface IPropsSwitcherToApply {
  isDraft?: boolean;
}

const ToFormStatement: FC<IPropsSwitcherToApply> = ({ isDraft }) => {
  const dispatch = useDispatch();
  const params = useSelector(selectParamsApplication);
  const delta = useSelector(selectDelta);
  const attachmentId = useSelector(selectAttachmentId);
  const loading = useSelector(formingLoading);
  return (
    <Card>
      <Stack>
        <Heading level={'h6'} size={'16px'}>
          Заявление на замену лет для расчёта больничного
        </Heading>
        <Box>
          <Button
            preloader={loading}
            size={'s'}
            width={'32px'}
            disabled={delta <= 0}
            onClick={() => {
              if (isDraft) {
                dispatch(editDraftStatement({ ...params, event: 'PRINT' }));
              } else {
                dispatch(formStatement({ ...params, event: 'PRINT' }));
              }
            }}>
            Сформировать
          </Button>
        </Box>
        {delta <= 0 && (
          <Hint variant={'yellow'} maxWidth={'100%'}>
            Невозможно сформировать заявление, если новый средний дневной заработок меньше либо
            равен, чем до замены лет
          </Hint>
        )}
        {attachmentId === undefined && (
          <Hint variant={'red'} maxWidth={'100%'}>
            К сожалению не удалось сформировать заявление. Обратитесь в службу поддержки.
          </Hint>
        )}
      </Stack>
    </Card>
  );
};

export default ToFormStatement;
