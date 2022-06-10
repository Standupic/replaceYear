import { Hint } from 'juicyfront';
import React from 'react';
import { Link, Text } from '../Calculator/calculator-parts';

const Hints = () => {
  return (
    <>
      <Hint title={'Пособие по временной нетрудоспособности'} variant={'blue'} maxWidth={'100%'}>
        <Text size={'0.875rem'}>
          Средний дневной заработок = сумма заработка работника
          <br />
          за расчётный период с учётом предельной величины баз / 730
        </Text>
      </Hint>
      <Hint title={'Особенности учёта стажа'} variant={'blue'} maxWidth={'100%'}>
        <Text size={'0.875rem'}>
          При стаже свыше 8 лет размер пособия составит 100%, при стаже от 5 до 8 лет – 80%, при
          стаже менее 5 лет – 60%. При возникновении вопросов по страховому стажу, обратитесь к
          куратору кадрового администрирования.
        </Text>
        <Link href="https://intranet.vtb.com/lk/Pages/default.aspx">Личный кабинет</Link>
      </Hint>
    </>
  );
};
export default Hints;
