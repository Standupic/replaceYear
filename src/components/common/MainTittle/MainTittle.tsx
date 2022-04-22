import React from 'react';
import { ReactComponent as BackSVG } from '../../../assets/images/back.svg';
import { IKeySpacingMap, Inline, Heading } from '../Tags';

const MainTittle = () => {
  return (
    <Inline gutter={IKeySpacingMap.lg}>
      <BackSVG />
      <Heading level={'h5'} size={'20px'}>
        Заявка на замену лет для расчёта больничного
      </Heading>
    </Inline>
  );
};

export default MainTittle;
