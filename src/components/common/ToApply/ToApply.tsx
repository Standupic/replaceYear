import React from 'react';
import { Button, Hint } from 'juicyfront';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Card, Heading, Stack } from '../../styledComponents';
import formingApplication from '../../../middlewares/formingApplication';
import { selectDelta, selectPostData } from '../../../selectors/calculatorSelector';
import { selectFormingApplicationLoading } from '../../../selectors/globalSelector';

const ToApply = () => {
  const dispatch = useDispatch();
  const postData = useSelector(selectPostData);
  const delta = useSelector(selectDelta);
  const formingLoading = useSelector(selectFormingApplicationLoading);
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
              dispatch(formingApplication(postData));
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
      </Stack>
    </Card>
  );
};

export default ToApply;
