import React, { FC } from 'react';
import { Box, Split, Stack } from '../../styledComponents';
import { SumBox, YearsBox } from './calculator-parts';
import TotalBox from './TotalBox';
import Years from './Years';

const Calculator: FC = () => {
  return (
    <>
      <Stack>
        <Split>
          <Stack>
            <SumBox>
              <TotalBox text={'До замены лет'} total={830} />
            </SumBox>
            <YearsBox>
              <Years />
            </YearsBox>
          </Stack>
          <Stack>
            <SumBox bg={'#3A85FF'} color={'#FFFFFF'}>
              <TotalBox text={'После замены лет'} total={1200} diff={30} isBenefit />
            </SumBox>
            <YearsBox bg={'#EDF5FF'}>
              <Years />
            </YearsBox>
          </Stack>
        </Split>
      </Stack>
    </>
  );
};

export default Calculator;
