import React from 'react';
import { useHistory } from 'react-router-dom';
import { ReactComponent as BackSVG } from '../../../assets/images/back.svg';
import InlineCluster from '../../styledComponents/InlineCluster';
import { KEY_JUSTIFYING, KEY_SPACING } from '../../styledComponents/constants';
import { Heading } from '../../styledComponents';

const MainTittle = () => {
  const history = useHistory();
  return (
    <InlineCluster gutter={KEY_SPACING.lg} align={KEY_JUSTIFYING.center}>
      <BackSVG
        onClick={() => {
          history.push('/replaceyears');
        }}
      />
      <Heading level={'h5'} size={'20px'}>
        Заявка на замену лет для расчёта больничного
      </Heading>
    </InlineCluster>
  );
};

export default MainTittle;
