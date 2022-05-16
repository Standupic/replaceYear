import React, { FC, useMemo } from 'react';
import { Hint } from 'juicyfront';
import { useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import { Card, Split, Stack } from '../../styledComponents';
import { KEY_SPACING } from '../../styledComponents/constants';
import { selectHelperList, totalNotActiveYears } from '../../../selectors/globalSelector';
import { Line, SumBox, YearsBox, Text, Link } from './calculator-parts';
import TotalBox from './TotalBox';
import { YearActive, YearNotActive } from './Years';

const Calculator: FC = () => {
  const currentYear = new Date().getFullYear();
  const total = useSelector(totalNotActiveYears);
  console.log(total);
  return (
    <Card>
      <Stack>
        <Split>
          <Stack>
            <SumBox>
              <TotalBox tittle={'До замены лет'} total={total} />
            </SumBox>
            <YearsBox>
              <Stack gutter={KEY_SPACING.sm}>
                <YearNotActive year={currentYear - 1} />
                <Line />
                <YearNotActive year={currentYear - 2} />
              </Stack>
            </YearsBox>
          </Stack>
          <Stack>
            <SumBox isActive>
              <TotalBox tittle={'После замены лет'} total={1200} diff={30} isActive />
            </SumBox>
            <YearsBox isActive>
              <Stack gutter={KEY_SPACING.sm}>
                <YearActive year={'2019'} income={'700000'} />
                <Line />
                <YearActive year={'2020'} income={'600000'} />
              </Stack>
            </YearsBox>
          </Stack>
        </Split>
        <Hint title={'Пособие по временной нетрудоспособности'} variant={'blue'} maxWidth={'100%'}>
          <Text size={'0.875rem'}>
            Средний дневной заработок = сумма заработка работника
            <br />
            за расчетный период с учетом предельной величины баз / 730
          </Text>
        </Hint>
        <Hint title={'Особенности учёта стажа'} variant={'blue'} maxWidth={'100%'}>
          <Text size={'0.875rem'}>
            При стаже свыше 8 лет размер пособия составит 100%, при стаже от 5 до 8 лет – 80%, при
            стаже менее 5 лет – 60%. При возникновении вопросов по страховому стажу, обратитесь к
            куратору кадрового администрирования.
          </Text>
          <Link href="#">Личный кабинет</Link>
        </Hint>
      </Stack>
    </Card>
  );
};

export default Calculator;
