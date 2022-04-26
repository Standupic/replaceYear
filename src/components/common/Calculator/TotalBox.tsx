import React, { FC } from 'react';
import { InlineCluster, Stack, Inline } from '../../styledComponents';
import { ReactComponent as CheckSVG } from '../../../assets/images/check.svg';
import { Text, Total, Different } from './calculator-parts';
import ReasonableBox from './Reasonable';

interface IPropsTotalBox {
  tittle: string;
  total: number;
  diff?: number;
  isActive?: boolean;
}

const TotalBox: FC<IPropsTotalBox> = ({ tittle, total, diff, isActive }) => {
  return (
    <Stack>
      <Text color={isActive ? '#FFFFFF' : '#74777f'}>{tittle}</Text>
      <Inline index={'0'}>
        <InlineCluster>
          <Total color={isActive ? '#FFFFFF' : '#74777f'}>{total} ₽</Total>
          {diff && <Different>-{diff} ₽</Different>}
        </InlineCluster>
        {isActive && <ReasonableBox text={'Самое выгодное'} svg={<CheckSVG />} />}
      </Inline>
    </Stack>
  );
};

export default TotalBox;
