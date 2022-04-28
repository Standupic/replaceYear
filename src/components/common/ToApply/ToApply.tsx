import React from 'react';
import { Button, Hint } from 'juicyfront';
import { Card, Heading, Stack } from '../../styledComponents';

const ToApply = () => {
  return (
    <Card>
      <Stack>
        <Heading level={'h6'} size={'16px'}>
          Заявление на замену лет для расчёта больничного
        </Heading>
        <Button size={'s'}>Сформировать</Button>
        <Hint variant={'yellow'} maxWidth={'100%'}>
          Невозможно сформировать заявление, если новый средний дневной заработок меньше, чем до
          замены лет
        </Hint>
      </Stack>
    </Card>
  );
};

export default ToApply;
