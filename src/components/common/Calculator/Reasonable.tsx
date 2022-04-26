import React, { FC, ReactNode } from 'react';
import { InlineCluster } from '../../styledComponents';
import { KEY_JUSTIFYING, KEY_SPACING } from '../../styledComponents/constants';
import { Reasonable } from './calculator-parts';

interface IReasonable {
  svg: ReactNode;
  text: string;
}

const ReasonableBox: FC<IReasonable> = ({ svg, text }) => {
  return (
    <Reasonable>
      <InlineCluster gutter={KEY_SPACING.sm} align={KEY_JUSTIFYING.center}>
        {svg}
        {text}
      </InlineCluster>
    </Reasonable>
  );
};
export default ReasonableBox;
