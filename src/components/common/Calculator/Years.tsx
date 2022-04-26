import React, { FC } from 'react';
import { Inline, Stack } from '../../styledComponents';
import { KEY_SPACING } from '../../styledComponents/constants';
import { ReactComponent as ArrowLeftSVG } from '../../../assets/images/arrow-left.svg';
import { ReactComponent as ArrowRightSVG } from '../../../assets/images/arrow-right.svg';
import { ButtonYear, Text, Line } from './calculator-parts';
interface IYearProps {
  isActive?: boolean;
  disable?: boolean;
}

const Year: FC<IYearProps> = ({ isActive }) => {
  return (
    <Stack gutter={KEY_SPACING.sm}>
      <YearControl isActive={isActive} />
      <Line />
      <YearControl isActive={isActive} />
    </Stack>
  );
};

const YearControl: FC<IYearProps> = ({ isActive, disable = true }) => {
  return (
    <Inline index={1} align={'center'} justify={'center'} height={'39px'}>
      {isActive && disable && (
        <ButtonYear>
          <ArrowLeftSVG />
        </ButtonYear>
      )}
      <Text align={'center'} size={'1.1rem'} color={isActive ? '#000' : '#74777f'}>
        2019
      </Text>
      {isActive && disable && (
        <ButtonYear>
          <ArrowRightSVG />
        </ButtonYear>
      )}
    </Inline>
  );
};

export default Year;
