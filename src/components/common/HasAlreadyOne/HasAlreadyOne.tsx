import { Button, Hint } from 'juicyfront';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Card, Heading, Stack } from '../../styledComponents';
import { selectHasAlreadyOneMessage } from '../../../selectors/globalSelector';
import { switchOnHasAlreadyOne } from '../../../store/globalStateSlice';

const HasAlreadyOne = () => {
  const hasAlreadyMessage = useSelector(selectHasAlreadyOneMessage);
  const dispatch = useDispatch();
  return (
    <Card>
      <Stack>
        <Heading level={'h6'} size={'16px'}>
          Заявление на замену лет
        </Heading>
        <Hint variant={'blue'} maxWidth={'100%'}>
          {hasAlreadyMessage}
        </Hint>
        <Box>
          <Button
            size={'s'}
            width={'32px'}
            onClick={() => {
              dispatch(switchOnHasAlreadyOne());
            }}>
            Продолжить
          </Button>
        </Box>
      </Stack>
    </Card>
  );
};

export default HasAlreadyOne;
