import { Button } from 'juicyfront';
import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { AllTrash } from 'juicyfront/indexIcon';
import PagePreloader from '../../components/common/PagePreloader';
import { PadBox, Stack, StickyButton, Inline } from '../../components/styledComponents';
import { KEY_SPACING } from '../../components/styledComponents/constants';
import User from '../../components/common/User';
import Calculator from '../../components/common/Calculator/Calculator';
import SwitcherToApply from '../../components/common/SwitcherToApply';
import submitStatement from '../../middlewares/submitStatement';
import { RootState } from '../../store';

import {
  selectDataActiveYears,
  selectIncomeActiveYears,
  selectTotalNotActiveYears,
} from '../../selectors/calculatorSelector';
import getApplication from '../../middlewares/getApplication';
import MainTittle from '../../components/common/MainTittle';
import DeleteButton from '../../components/styledComponents/DeleteButton/index.';
import deleteDraft from '../../middlewares/deleteDraft';
import ModalDraft from '../../components/common/ModalDraft/ModalDraft';
import { computingApplication } from '../../store/calculatorSlice';
import { resetDraft, toggleDraftSigned, updateDraftAttachmentFile } from '../../store/draftSlice';
import editDraftStatement from '../../middlewares/editDraft';

const DraftApplication = () => {
  const { topActiveYear, bottomActiveYear, previousYear, beforePreviousYear } = useSelector(
    (state: RootState) => state.calculator,
  );
  const { submitLoading, isHandSignature } = useSelector((state: RootState) => state.globalState);
  const {
    draftLoading,
    currentDraft,
    isSigned,
    attachmentDraftId,
    toFormStatement,
    toFormLoading,
  } = useSelector((state: RootState) => state.draft);
  const { attachment, timeStamp } = currentDraft;
  const dispatch = useDispatch();
  const totalNotActiveYear = useSelector(selectTotalNotActiveYears);
  const dataActiveYears = useSelector(selectDataActiveYears);
  const { total, delta, isTheBest, controller } = dataActiveYears;
  const { topYearIncome, bottomYearIncome } = useSelector(selectIncomeActiveYears);
  const params = useParams<{ id: string }>();
  useEffect(() => {
    if (params && params.id) {
      dispatch(getApplication({ id: params.id, isDraft: true }));
    }
    return () => {
      dispatch(resetDraft());
      dispatch(computingApplication());
    };
  }, [params, params.id, dispatch]);

  const handlerToFormStatement = useCallback(() => {
    dispatch(
      editDraftStatement({
        NextYear1: topActiveYear.value.toString(),
        NextYear2: bottomActiveYear.value.toString(),
        event: 'PRINT',
        Id: attachmentDraftId,
      }),
    );
  }, [topActiveYear.value, bottomActiveYear.value, attachmentDraftId]);

  const toUpdateAttachment = useCallback(
    (props: { base64: string; cert?: string; singBase64?: string }) => {
      dispatch(updateDraftAttachmentFile(props));
    },
    [dispatch],
  );

  const cancelSign = useCallback(() => {
    dispatch(toggleDraftSigned(false));
  }, [dispatch]);

  return (
    <PagePreloader loader={draftLoading}>
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
            diff={delta}
            isTheBest={isTheBest}
            controller={controller}
            topYearIncome={topYearIncome}
            bottomYearIncome={bottomYearIncome}
          />
          <SwitcherToApply
            attachmentId={attachmentDraftId}
            isHandSignature={isHandSignature}
            isVisibleFormStatement={toFormStatement}
            attachment={attachment}
            toFormStatement={handlerToFormStatement}
            toUpdateAttachment={toUpdateAttachment}
            cancelSign={cancelSign}
            toFormLoading={toFormLoading}
          />
        </>
      </Stack>
      <StickyButton>
        <Inline gutter={KEY_SPACING.sm}>
          <Button
            preloader={submitLoading}
            disabled={delta <= 0 || !isSigned}
            onClick={() => {
              dispatch(
                submitStatement({
                  attachments: { ...attachment },
                  id: attachmentDraftId,
                }),
              );
            }}>
            Отправить
          </Button>
          <DeleteButton
            onClick={() => {
              dispatch(deleteDraft({ id: params.id }));
            }}>
            <AllTrash color={'red'} />
          </DeleteButton>
        </Inline>
      </StickyButton>
      <ModalDraft />
    </PagePreloader>
  );
};

export default DraftApplication;
