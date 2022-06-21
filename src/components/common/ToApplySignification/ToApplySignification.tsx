import React, { FC } from 'react';
import { Signification } from 'juicyfront';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentDate } from '../../../selectors/globalSelector';
import { IAttachment } from '../../../middlewares/getStatement';
import { attachFile, cancelSign } from '../../../store/globalStateSlice';
import { IPropsSwitcherToApply } from '../SwitcherToApply/SwitcherToApply';
import { RootState } from '../../../store';

const ToApplySignification: FC<IPropsSwitcherToApply> = ({ isDraft }) => {
  const { paramsAttachment } = useSelector((state: RootState) => state.globalState);
  const { currentApplication } = useSelector((state: RootState) => state.applications);
  const currentDate = useSelector(selectCurrentDate);
  const dispatch = useDispatch();
  const currentAttachment = isDraft ? currentApplication.attachment : paramsAttachment;
  return (
    <>
      <Signification
        onSignify={(result) => {
          if (result) {
            const { file } = result;
            dispatch(
              attachFile({ base64: file.base64, cert: file.cert, singBase64: file.singBase64 }),
            );
          }
        }}
        onSignCancel={() => {
          dispatch(cancelSign());
        }}
        data={currentAttachment ? currentAttachment : ({} as IAttachment)}
        hideButtons={['reject', 'rejectManual']}
        title={`Заявление на замену лет для расчёта больничного от ${currentDate}`}
      />
    </>
  );
};

export default ToApplySignification;
