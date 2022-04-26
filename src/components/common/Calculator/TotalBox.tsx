import React, { FC } from 'react';
import { InlineCluster, Stack, Inline } from '../../styledComponents';
import { ReactComponent as CheckSVG } from '../../../assets/images/check.svg';
import { Text, Total, Different } from './calculator-parts';
import ReasonableBox from './Reasonable';

interface IPropsTotalBox {
  text: string;
  total: number;
  diff?: number;
  isBenefit?: boolean;
}

const TotalBox: FC<IPropsTotalBox> = ({ text, total, diff, isBenefit }) => {
  return (
    <Stack>
      <Text color={isBenefit ? '#FFFFFF' : ''}>{text}</Text>
      <Inline index={'0'}>
        <InlineCluster>
          <Total color={isBenefit ? '#FFFFFF' : ''}>{total} ₽</Total>
          {diff && <Different>-{diff} ₽</Different>}
        </InlineCluster>
        {isBenefit && <ReasonableBox text={'Самое выгодное'} svg={<CheckSVG />} />}
      </Inline>
    </Stack>
  );
};

export default TotalBox;
