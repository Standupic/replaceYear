import React, { FC } from 'react';
import { Stack } from '../../styledComponents';
import { Text, Total, SumBox } from './calculator-parts';
import TotalBox from './TotalBox';

const Calculator: FC = () => {
  return (
    <>
      <Stack>
        <SumBox>
          <TotalBox text={'До замены лет'} total={830} />
        </SumBox>
        <SumBox bg={'#3A85FF'} color={'#FFFFFF'}>
          <TotalBox text={'После замены лет'} total={1200} color={'#FFFFFF'} diff={30} />
        </SumBox>
      </Stack>
    </>
  );
};

export default Calculator;
