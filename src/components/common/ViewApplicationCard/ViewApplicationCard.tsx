import React from 'react';
import { useSelector } from 'react-redux';
import { Preloader } from 'juicyfront';
import { Card, Split, Stack } from '../../styledComponents';
import { Line, SumBox, YearsBox } from '../Calculator/calculator-parts';
import { TotalBoxNotActive } from '../Calculator/TotalBox';
import { getCurrency } from '../../../helpers';
import { KEY_SPACING } from '../../styledComponents/constants';
import { YearNotActive } from '../Calculator/Years';
import Hints from '../Hints';
import {
  selectViewApplication,
} from '../../../selectors/applicationsSelector';

const ViewApplicationCard = () => {
  const viewApplication = useSelector(selectViewApplication);
  const {
    previousYear,
    beforePreviousYear,
    topActiveYear,
    bottomActiveYear,
    totalNotActive,
    totalActive,
  } = viewApplication;
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
                <YearNotActive year={Number(previousYear)} />
                <Line />
                <YearNotActive year={Number(beforePreviousYear)} />
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
                <YearNotActive year={Number(topActiveYear)} />
                <Line />
                <YearNotActive year={Number(bottomActiveYear)} />
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
