import React from 'react';
import { ReactComponent as BackSVG } from '../../../assets/images/back.svg';
import InlineCluster from '../../styledComponents/InlineCluster';
import { KEY_JUSTIFYING, KEY_SPACING } from '../../styledComponents/constants';
import Heading from '../../styledComponents/Heading';

const MainTittle = () => {
  return (
    <InlineCluster gutter={KEY_SPACING.lg} align={KEY_JUSTIFYING.center}>
      <BackSVG />
      <Heading level={'h5'} size={'20px'}>
        Заявка на замену лет для расчёта больничного
      </Heading>
    </InlineCluster>
  );
};

export default MainTittle;
