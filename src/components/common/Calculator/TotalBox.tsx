import React, { FC } from 'react';
import { InlineCluster, Stack, Inline } from '../../styledComponents';
import { ReactComponent as CheckSVG } from '../../../assets/images/check.svg';
import { ReactComponent as ReturnSVG } from '../../../assets/images/return.svg';
import { getCurrency } from '../../../helpers';
import { KEY_SPACING } from '../../styledComponents/constants';
import { Text, Total, Different } from './calculator-parts';
import ReasonableBox from './Reasonable';

interface IPropsTotalBox {
  tittle: string;
  total: string;
  diff?: number;
  isTheBest?: boolean;
}

const TotalBoxActive: FC<IPropsTotalBox> = ({ tittle, total, diff, isTheBest }) => {
  console.log(isTheBest);
  return (
    <Stack gutter={KEY_SPACING.sm}>
      <Inline index={'0'} height={'30px'}>
        <Text color={'#FFFFFF'}>{tittle}</Text>
        {diff && diff < 0 ? <Different>{getCurrency(diff)}</Different> : null}
      </Inline>
      <Inline index={'0'}>
        <Total color={'#FFFFFF'}>{total}</Total>
        {isTheBest && <ReasonableBox text={'Самое выгодное'} svg={<CheckSVG />} />}
        {!isTheBest ? <ReasonableBox text={'К самому выгодному'} svg={<ReturnSVG />} /> : null}
      </Inline>
    </Stack>
  );
};

export const TotalBoxNotActive: FC<Partial<IPropsTotalBox>> = ({ tittle, total }) => {
  return (
    <Stack>
      <Text color={'#74777f'}>{tittle}</Text>
      <Inline index={'0'}>
        <Total color={'#74777f'}>{total}</Total>
      </Inline>
    </Stack>
  );
};

export default TotalBoxActive;
