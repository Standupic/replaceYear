import React, { FC } from 'react';
import { Split, Stack } from '../../styledComponents';
import { SumBox, YearsBox} from './calculator-parts';
import TotalBox from './TotalBox';
import Year from './Years';

const Calculator: FC = () => {
  return (
    <>
      <Stack>
        <Split>
          <Stack>
            <SumBox>
              <TotalBox tittle={'До замены лет'} total={830} />
            </SumBox>
            <YearsBox>
              <Year />
            </YearsBox>
          </Stack>
          <Stack>
            <SumBox isActive>
              <TotalBox tittle={'После замены лет'} total={1200} diff={30} isActive />
            </SumBox>
            <YearsBox isActive>
              <Year isActive />
            </YearsBox>
          </Stack>
        </Split>
      </Stack>
    </>
  );
};

export default Calculator;
