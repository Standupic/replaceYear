import React, { FC } from 'react';
import { useHistory } from 'react-router-dom';
import { ReactComponent as BackSVG } from '../../../assets/images/back.svg';
import InlineCluster from '../../styledComponents/InlineCluster';
import { KEY_JUSTIFYING, KEY_SPACING } from '../../styledComponents/constants';
import { Heading } from '../../styledComponents';

const MainTittle: FC<{ text: string }> = ({text}) => {
  const history = useHistory();
  return (
    <InlineCluster gutter={KEY_SPACING.lg} align={KEY_JUSTIFYING.center}>
      <BackSVG
        onClick={() => {
          history.push('/replaceyears');
        }}
      />
      <Heading level={'h5'} size={'20px'}>
        {text}
      </Heading>
    </InlineCluster>
  );
};

export default MainTittle;
