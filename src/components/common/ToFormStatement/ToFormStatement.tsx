import React from 'react';
import { Button, Hint } from 'juicyfront';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Card, Heading, Stack } from '../../styledComponents';
import formStatement from '../../../middlewares/formStatement';
import { selectDelta, selectPostData } from '../../../selectors/calculatorSelector';
import {
  selectAttachmentId,
  selectFormingApplicationLoading,
} from '../../../selectors/globalSelector';

const ToFormStatement = () => {
  const dispatch = useDispatch();
  const params = useSelector(selectPostData);
  const delta = useSelector(selectDelta);
  const formingLoading = useSelector(selectFormingApplicationLoading);
  const attachmentId = useSelector(selectAttachmentId);
  return (
    <Card>
      <Stack>
        <Heading level={'h6'} size={'16px'}>
          Заявление на замену лет для расчёта больничного
        </Heading>
        <Box>
          <Button
            preloader={formingLoading}
            size={'s'}
            width={'32px'}
            disabled={delta <= 0}
            onClick={() => {
              dispatch(formStatement(params));
            }}>
            Сформировать
          </Button>
        </Box>
        {delta <= 0 && (
          <Hint variant={'yellow'} maxWidth={'100%'}>
            Невозможно сформировать заявление, если новый средний дневной заработок меньше, чем до
            замены лет
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
