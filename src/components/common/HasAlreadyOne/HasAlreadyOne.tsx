import { Button, Hint } from 'juicyfront';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Card, Heading, Stack } from '../../styledComponents';
import { toggleToContinue } from '../../../store/globalStateSlice';
import { RootState } from '../../../store';

const HasAlreadyOne = () => {
  const { hasAlreadyOneMessage } = useSelector((state: RootState) => state.globalState);
  const dispatch = useDispatch();
  return (
    <Card>
      <Stack>
        <Heading level={'h6'} size={'16px'}>
          Заявление на замену лет
        </Heading>
        <Hint variant={'blue'} maxWidth={'100%'}>
          {hasAlreadyOneMessage}
        </Hint>
        <Box>
          <Button
            size={'s'}
            width={'32px'}
            onClick={() => {
              dispatch(toggleToContinue(true));
            }}>
            Продолжить
          </Button>
        </Box>
      </Stack>
    </Card>
  );
};

export default HasAlreadyOne;
