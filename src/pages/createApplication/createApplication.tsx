import React, { useCallback, useEffect } from 'react';
import { Button } from 'juicyfront';
import { useDispatch, useSelector } from 'react-redux';
import { PadBox, Stack, StickyButton } from '../../components/styledComponents';
import Permission from '../../components/Permission';
import { KEY_SPACING } from '../../components/styledComponents/constants';
import Calculator from '../../components/common/Calculator/Calculator';
import HasAlreadyOne from '../../components/common/HasAlreadyOne/HasAlreadyOne';
import {
  selectDataActiveYears,
  selectIncomeActiveYears,
  selectTotalNotActiveYears,
} from '../../selectors/calculatorSelector';
import SwitcherToApply from '../../components/common/SwitcherToApply';
import User from '../../components/common/User';
import submitStatement from '../../middlewares/submitStatement';
import PagePreloader from '../../components/common/PagePreloader';
import { RootState } from '../../store';
import {
  updateAttachNewApplicationFile,
  toggleToContinue,
  cancelSign,
  resetCreateApplication,
  resetStatementAttachment,
} from '../../store/globalStateSlice';
import formStatement from '../../middlewares/formStatement';
import getStatement from '../../middlewares/getStatement';
import IsPdf from '../../components/common/IsPdf';

const createApplication = () => {
  const {
    attachmentId,
    attachment,
    isSigned,
    submitLoading,
    initLoading,
    toContinue,
    hasAlreadyOneMessage,
    isHandSignature,
    isVisibleFormStatement,
    formStatementLoading,
    pdfFileLoading,
    isPdf,
  } = useSelector((state: RootState) => state.globalState);
  const dispatch = useDispatch();
  const { topActiveYear, bottomActiveYear, previousYear, beforePreviousYear } = useSelector(
    (state: RootState) => state.calculator,
  );
  const totalNotActiveYear = useSelector(selectTotalNotActiveYears);
  const dataActiveYears = useSelector(selectDataActiveYears);
  const { total, delta, isTheBest, controller } = dataActiveYears;
  const { topYearIncome, bottomYearIncome } = useSelector(selectIncomeActiveYears);
  useEffect(() => {
    if (hasAlreadyOneMessage) {
      dispatch(toggleToContinue(false));
    }
    return () => {
      dispatch(resetCreateApplication());
    };
  }, []);
  const handlerToFormStatement = () => {
    const data = {
      NextYear1: topActiveYear.value.toString(),
      NextYear2: bottomActiveYear.value.toString(),
      event: 'PRINT',
    };
    const params = attachmentId ? { ...data, Id: attachmentId } : { ...data };
    dispatch(formStatement(params));
  };
  const toUpdateAttachment = useCallback(
    (props: { base64: string; cert?: string; singBase64?: string; fileName?: string }) => {
      dispatch(updateAttachNewApplicationFile(props));
    },
    [],
  );

  const cancelSignHandler = useCallback(() => {
    dispatch(cancelSign());
  }, []);

  const resetManually = useCallback(() => {
    dispatch(resetStatementAttachment());
  }, []);

  const getStatementManually = useCallback((id: string) => {
    dispatch(getStatement(id));
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
                diff={delta}
                isTheBest={isTheBest}
                controller={controller}
                topYearIncome={topYearIncome}
                bottomYearIncome={bottomYearIncome}
              />
              {!isPdf && <IsPdf />}
              <SwitcherToApply
                attachmentId={attachmentId}
                isHandSignature={isHandSignature}
                isVisibleFormStatement={isVisibleFormStatement}
                attachment={attachment}
                toFormStatement={handlerToFormStatement}
                toUpdateAttachment={toUpdateAttachment}
                cancelSign={cancelSignHandler}
                toFormLoading={formStatementLoading}
                resetAttachmentManually={resetManually}
                getStatementManually={getStatementManually}
                pdfFileLoading={pdfFileLoading}
              />
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
              disabled={delta <= 0 || !isSigned || !isPdf}
              onClick={() => {
                dispatch(
                  submitStatement({
                    attachments: { ...attachment },
                    id: attachmentId,
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
