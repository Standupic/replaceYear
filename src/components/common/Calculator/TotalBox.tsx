import React, { FC } from 'react';
import { InlineCluster, Stack, Box } from '../../styledComponents';
import { SumBox, Text, Total } from './calculator-parts';

interface IPropsTotalBox {
  text: string;
  total: number;
  color?: string;
  diff?: number;
}

const TotalBox: FC<IPropsTotalBox> = ({ text, total, color, diff }) => {
  return (
    <Stack>
      <Text color={color && color}>{text}</Text>
      <InlineCluster>
        <Total color={color && color}>{total} ₽</Total>
        {diff && <Box>-{diff} $</Box>}
      </InlineCluster>
    </Stack>
  );
};

export default TotalBox;
