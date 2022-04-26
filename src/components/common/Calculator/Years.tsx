import React, { Suspense } from 'react';
import { Inline, Grid } from '../../styledComponents';
import { ButtonYear } from './calculator-parts';

const Year = () => {
  return (
    <Grid>
      <ButtonYear>{'<'}</ButtonYear>
      <p>2019</p>
      <ButtonYear>{'>'}</ButtonYear>
    </Grid>
  );
};

export default Year;
