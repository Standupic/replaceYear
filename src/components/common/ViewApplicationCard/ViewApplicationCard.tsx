import React, { FC } from 'react';
import { Card, Split, Stack } from '../../styledComponents';
import { Line, SumBox, YearsBox } from '../Calculator/calculator-parts';
import { TotalBoxNotActive } from '../Calculator/TotalBox';
import { getCurrency } from '../../../helpers';
import { KEY_SPACING } from '../../styledComponents/constants';
import { YearNotActive } from '../Calculator/Years';
import Hints from '../Hints';

interface IProps {
  previousYear: string;
  beforePreviousYear: string;
  topActiveYear: string;
  bottomActiveYear: string;
  totalNotActive: number;
  totalActive: number;
}

const ViewApplicationCard: FC<IProps> = ({
  previousYear,
  beforePreviousYear,
  topActiveYear,
  bottomActiveYear,
  totalNotActive,
  totalActive,
}) => {
  return (
    <Card>
      <Stack>
        <Split>
          <Stack>
            <SumBox>
              <TotalBoxNotActive
                tittle={'До замены лет'}
                total={getCurrency(totalNotActive / 730)}
              />
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
            <SumBox>
              <TotalBoxNotActive
                tittle={'После замены лет'}
                total={getCurrency(totalActive / 730)}
              />
            </SumBox>
            <YearsBox>
              <Stack gutter={KEY_SPACING.sm}>
                <YearNotActive year={topActiveYear} />
                <Line />
                <YearNotActive year={bottomActiveYear} />
              </Stack>
            </YearsBox>
          </Stack>
        </Split>
        <Hints />
      </Stack>
    </Card>
  );
};

export default ViewApplicationCard;
