import React from 'react';
import { Button, Hint } from 'juicyfront';
import { Box, Card, Heading, Stack } from '../../styledComponents';

const ToApply = () => {
  return (
    <Card>
      <Stack>
        <Heading level={'h6'} size={'16px'}>
          Заявление на замену лет для расчёта больничного
        </Heading>
        <Box>
          <Button size={'s'} width={'32px'}>
            Сформировать
          </Button>
        </Box>
        <Hint variant={'yellow'} maxWidth={'100%'}>
          Невозможно сформировать заявление, если новый средний дневной заработок меньше, чем до
          замены лет
        </Hint>
      </Stack>
    </Card>
  );
};

export default ToApply;
