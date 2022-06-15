import React, { FC } from 'react';
import { Card, Split, Stack } from '../../styledComponents';
import { KEY_SPACING } from '../../styledComponents/constants';
import { getCurrency } from '../../../helpers';
import { IYear, YEARS_KEY } from '../../../store/calculatorSlice';
import Hints from '../Hints';
import { Line, SumBox, YearsBox } from './calculator-parts';
import TotalBoxActive, { TotalBoxNotActive } from './TotalBox';
import { YearActive, YearNotActive } from './Years';

interface IController {
  top: { left: boolean; right: boolean };
  bottom: { left: boolean; right: boolean };
}

interface IProps {
  topActiveYear: IYear;
  bottomActiveYear: IYear;
  previousYear: number;
  beforePreviousYear: number;
  totalNotActiveYear: number;
  total: number;
  diff: number;
  isTheBest: boolean;
  controller: IController;
  topYearIncome: number;
  bottomYearIncome: number;
}

const Calculator: FC<IProps> = ({
  topActiveYear,
  bottomActiveYear,
  previousYear,
  beforePreviousYear,
  totalNotActiveYear,
  total,
  diff,
  isTheBest,
  controller,
  topYearIncome,
  bottomYearIncome,
}) => {
  return (
    <Card>
      <Stack>
        <Split>
          <Stack>
            <SumBox>
              <TotalBoxNotActive
                tittle={'До замены лет'}
                total={getCurrency(totalNotActiveYear) || 0}
              />
            </SumBox>
            <YearsBox>
              <Stack gutter={KEY_SPACING.sm}>
                <YearNotActive year={String(previousYear)} />
                <Line />
                <YearNotActive year={String(beforePreviousYear)} />
              </Stack>
            </YearsBox>
          </Stack>
          <Stack>
            <SumBox isActive>
              <TotalBoxActive
                tittle={'После замены лет'}
                total={getCurrency(total) || 0}
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
