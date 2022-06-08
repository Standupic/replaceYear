import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { Card, Split, Stack } from '../../styledComponents';
import { KEY_SPACING } from '../../styledComponents/constants';
import {
  selectTotalNotActiveYears,
  selectBottomYear,
  selectTopYear,
  selectDataActiveYears,
  selectIncomeActiveYears,
  selectPreviousYear,
  selectBeforePreviousYear,
} from '../../../selectors/calculatorSelector';
import { getCurrency } from '../../../helpers';
import { YEARS_KEY } from '../../../store/calculatorSlice';
import Hints from '../Hints';
import { Line, SumBox, YearsBox } from './calculator-parts';
import TotalBoxActive, { TotalBoxNotActive } from './TotalBox';
import { YearActive, YearNotActive } from './Years';

const Calculator: FC = () => {
  const totalNotActiveYear = useSelector(selectTotalNotActiveYears);
  const topActiveYear = useSelector(selectTopYear);
  const bottomActiveYear = useSelector(selectBottomYear);
  const dataActiveYears = useSelector(selectDataActiveYears);
  const { total, diff, isTheBest, controller } = dataActiveYears;
  const { topYearIncome, bottomYearIncome } = useSelector(selectIncomeActiveYears);
  const previousYear = useSelector(selectPreviousYear);
  const beforePreviousYear = useSelector(selectBeforePreviousYear);
  return (
    <Card>
      <Stack>
        <Split>
          <Stack>
            <SumBox>
              <TotalBoxNotActive tittle={'До замены лет'} total={getCurrency(totalNotActiveYear)} />
            </SumBox>
            <YearsBox>
              <Stack gutter={KEY_SPACING.sm}>
                <YearNotActive year={previousYear} />
                <Line />
                <YearNotActive year={beforePreviousYear} />
              </Stack>
            </YearsBox>
          </Stack>
          <Stack>
            <SumBox isActive>
              <TotalBoxActive
                tittle={'После замены лет'}
                total={getCurrency(total)}
                diff={diff}
                isTheBest={isTheBest}
              />
            </SumBox>
            <YearsBox isActive>
              <Stack gutter={KEY_SPACING.sm}>
                <YearActive
                  year={topActiveYear.value}
                  type={YEARS_KEY.topYear}
                  income={topYearIncome}
                  controller={controller.top}
                  disabled={!topActiveYear.isSelectable}
                />
                <Line />
                <YearActive
                  year={bottomActiveYear.value}
                  type={YEARS_KEY.bottomYear}
                  income={bottomYearIncome}
                  controller={controller.bottom}
                  disabled={!bottomActiveYear.isSelectable}
                />
              </Stack>
            </YearsBox>
          </Stack>
        </Split>
        <Hints />
      </Stack>
    </Card>
  );
};

export default Calculator;
