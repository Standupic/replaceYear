import { Button } from 'juicyfront';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import PagePreloader from '../../components/common/PagePreloader';
import { PadBox, Stack, StickyButton } from '../../components/styledComponents';
import { KEY_SPACING } from '../../components/styledComponents/constants';
import User from '../../components/common/User';
import Calculator from '../../components/common/Calculator/Calculator';
import SwitcherToApply from '../../components/common/SwitcherToApply';
import submitStatement from '../../middlewares/submitStatement';
import { RootState } from '../../store';
import {
  selectDataActiveYears,
  selectDelta,
  selectIncomeActiveYears,
  selectTotalNotActiveYears,
} from '../../selectors/calculatorSelector';
import getApplication from '../../middlewares/getApplication';
import { resetCurrentApplication } from '../../store/applicationsSlice';
import MainTittle from '../../components/common/MainTittle';

const DraftApplication = () => {
  const { hasAlreadyOneMessage, statementAttachmentId, paramsAttachment, isSigned, submitLoading } =
    useSelector((state: RootState) => state.globalState);
  const { loading, currentApplication } = useSelector((state: RootState) => state.applications);
  const { timeStamp } = currentApplication;
  const { topActiveYear, bottomActiveYear, previousYear, beforePreviousYear } = useSelector(
    (state: RootState) => state.calculator,
  );
  const dispatch = useDispatch();
  const delta = useSelector(selectDelta);
  const totalNotActiveYear = useSelector(selectTotalNotActiveYears);
  const dataActiveYears = useSelector(selectDataActiveYears);
  const { total, diff, isTheBest, controller } = dataActiveYears;
  const { topYearIncome, bottomYearIncome } = useSelector(selectIncomeActiveYears);
  const params = useParams<{ id: string }>();
  useEffect(() => {
    if (params && params.id) {
      dispatch(getApplication({ id: params.id, isDraft: true }));
    }
    return () => {
      dispatch(resetCurrentApplication());
    };
  }, [params, params.id, dispatch]);

  return (
    <PagePreloader loader={loading}>
      <Stack as={PadBox} padding={[KEY_SPACING.lg, KEY_SPACING.zero, KEY_SPACING.zero]}>
        <>
          <MainTittle
            text={`Заявка на замену лет для расчёта больничного на ${new Date(
              timeStamp,
            ).getFullYear()} год от ${new Date(timeStamp).toLocaleDateString()} [Черновик]`}
          />
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
        )
      </Stack>
      {!hasAlreadyOneMessage && (
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
    </PagePreloader>
  );
};

export default DraftApplication;
