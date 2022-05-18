import React, { FC } from 'react';
import { InlineCluster, Stack, Inline } from '../../styledComponents';
import { ReactComponent as CheckSVG } from '../../../assets/images/check.svg';
import { Text, Total, Different } from './calculator-parts';
import ReasonableBox from './Reasonable';

interface IPropsTotalBox {
  tittle: string;
  total: string;
  diff?: number;
  isActive?: boolean;
  isTheBest?: boolean;
}

const TotalBox: FC<IPropsTotalBox> = ({ tittle, total, diff, isActive, isTheBest }) => {
  console.log(isTheBest);
  return (
    <Stack>
      <Text color={isActive ? '#FFFFFF' : '#74777f'}>{tittle}</Text>
      <Inline index={'0'}>
        <InlineCluster>
          <Total color={isActive ? '#FFFFFF' : '#74777f'}>{total}</Total>
          {diff && diff < 0 ? <Different>{diff} ₽</Different> : null}
        </InlineCluster>
        {isTheBest && <ReasonableBox text={'Самое выгодное'} svg={<CheckSVG />} />}
      </Inline>
    </Stack>
  );
};

export default TotalBox;
