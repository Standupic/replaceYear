import React, { useEffect } from 'react';
import { Button } from 'juicyfront';
import { useDispatch, useSelector } from 'react-redux';
import { PadBox, Stack, StickyButton } from '../../components/styledComponents';
import Permission from '../../components/Permission';
import { KEY_SPACING } from '../../components/styledComponents/constants';
import Calculator from '../../components/common/Calculator/Calculator';
import HasAlreadyOne from '../../components/common/HasAlreadyOne/HasAlreadyOne';
import {
  selectDataActiveYears,
  selectDelta,
  selectIncomeActiveYears,
  selectTotalNotActiveYears,
} from '../../selectors/calculatorSelector';
import SwitcherToApply from '../../components/common/SwitcherToApply';
import User from '../../components/common/User';
import submitStatement from '../../middlewares/submitStatement';
import PagePreloader from '../../components/common/PagePreloader';
import { RootState } from '../../store';
import { toggleIsVisibleFormStatement } from '../../store/globalStateSlice';

const createApplication = () => {
  const {
    statementAttachmentId,
    paramsAttachment,
    isSigned,
    submitLoading,
    initLoading,
    toContinue,
  } = useSelector((state: RootState) => state.globalState);
  const delta = useSelector(selectDelta);
  const dispatch = useDispatch();
  const { topActiveYear, bottomActiveYear, previousYear, beforePreviousYear } = useSelector(
    (state: RootState) => state.calculator,
  );
  const totalNotActiveYear = useSelector(selectTotalNotActiveYears);
  const dataActiveYears = useSelector(selectDataActiveYears);
  const { total, diff, isTheBest, controller } = dataActiveYears;
  const { topYearIncome, bottomYearIncome } = useSelector(selectIncomeActiveYears);
  useEffect(() => {
    return () => {
      dispatch(toggleIsVisibleFormStatement(true));
    };
  }, []);
  return (
    <PagePreloader loader={initLoading}>
      <Permission mode={'create'}>
        <Stack as={PadBox} padding={[KEY_SPACING.lg, KEY_SPACING.zero, KEY_SPACING.zero]}>
          {toContinue ? (
            <>
              <User />
              <Calculator
                topActiveYear={topActiveYear}
                bottomActiveYear={bottomActiveYear}
                previousYear={previousYear}
                beforePreviousYear={beforePreviousYear}
                totalNotActiveYear={totalNotActiveYear}
                total={total}
                diff={diff}
                isTheBest={isTheBest}
                controller={controller}
                topYearIncome={topYearIncome}
                bottomYearIncome={bottomYearIncome}
              />
              <SwitcherToApply />
            </>
          ) : (
            <>
              <User />
              <HasAlreadyOne />
            </>
          )}
        </Stack>
        {toContinue && (
          <StickyButton>
            <Button
              preloader={submitLoading}
              disabled={delta <= 0 || !isSigned}
              onClick={() => {
                dispatch(
                  submitStatement({
                    attachments: { ...paramsAttachment },
                    id: statementAttachmentId,
                  }),
                );
              }}>
              Отправить
            </Button>
          </StickyButton>
        )}
      </Permission>
    </PagePreloader>
  );
};

export default createApplication;
