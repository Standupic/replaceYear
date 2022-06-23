import React, { FC } from 'react';
import { Button, Hint } from 'juicyfront';
import { useSelector } from 'react-redux';
import { Box, Card, Heading, Stack } from '../../styledComponents';
import { selectDelta } from '../../../selectors/calculatorSelector';

export interface IPropsSwitcherToApply {
  toFormStatement: () => void;
  loading: boolean;
}
const ToFormStatement: FC<IPropsSwitcherToApply> = ({ toFormStatement, loading }) => {
  const delta = useSelector(selectDelta);
  return (
    <Card>
      <Stack>
        <Heading level={'h6'} size={'16px'}>
          Заявление на замену лет для расчёта больничного
        </Heading>
        <Box>
          <Button
            preloader={loading}
            size={'s'}
            width={'32px'}
            disabled={delta <= 0}
            onClick={() => {
              toFormStatement();
            }}>
            Сформировать
          </Button>
        </Box>
        {delta <= 0 && (
          <Hint variant={'yellow'} maxWidth={'100%'}>
            Невозможно сформировать заявление, если новый средний дневной заработок меньше либо
            равен, чем до замены лет
          </Hint>
        )}
      </Stack>
    </Card>
  );
};

export default ToFormStatement;
