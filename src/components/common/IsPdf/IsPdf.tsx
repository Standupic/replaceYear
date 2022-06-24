import React from 'react';
import { Hint } from 'juicyfront';
import { Card } from '../../styledComponents';
import { Text } from '../Calculator/calculator-parts';

const isPdf = () => {
  return (
    <Card>
      <Hint variant={'red'} maxWidth={'100%'}>
        <Text size={'0.875rem'}>Прикрепите пожалуйста файл формата pdf.</Text>
      </Hint>
    </Card>
  );
};

export default isPdf;
