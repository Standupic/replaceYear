import React from 'react';
import { Signification } from 'juicyfront';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentDate, selectParamsAttachment } from '../../../selectors/globalSelector';
import { IRequestAttachment } from '../../../middlewares/getStatement';
import { attachFile } from '../../../store/globalStateSlice';

const ToApplySignification = () => {
  const statement = useSelector(selectParamsAttachment);
  const currentDate = useSelector(selectCurrentDate);
  const dispatch = useDispatch();
  return (
    <>
      <Signification
        onSignify={(result) => {
          console.log(result);
          const { file } = result;
          dispatch(attachFile({ base64: file.base64 }));
        }}
        data={statement ? statement : ({} as IRequestAttachment)}
        hideButtons={['reject', 'rejectManual']}
        title={`Заявление на замену лет для расчёта больничного от ${currentDate}`}
      />
    </>
  );
};

export default ToApplySignification;
