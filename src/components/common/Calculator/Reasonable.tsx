import React, { FC, ReactNode } from 'react';
import { useDispatch } from 'react-redux';
import { InlineCluster } from '../../styledComponents';
import { KEY_JUSTIFYING, KEY_SPACING } from '../../styledComponents/constants';
import { Reasonable } from './calculator-parts';

interface IReasonable {
  svg: ReactNode;
  text: string;
  handleToBenefit?: () => void;
}

const ReasonableBox: FC<IReasonable> = ({ svg, text, handleToBenefit }) => {
  const dispatch = useDispatch();
  return (
    <Reasonable onClick={() => dispatch(handleToBenefit && handleToBenefit())}>
      <InlineCluster gutter={KEY_SPACING.xs} align={KEY_JUSTIFYING.center}>
        {svg}
        {text}
      </InlineCluster>
    </Reasonable>
  );
};
export default ReasonableBox;
