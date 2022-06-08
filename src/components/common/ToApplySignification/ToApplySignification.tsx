import React from 'react';
import { Signification, Preloader } from 'juicyfront';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectCurrentDate,
  selectFormingApplicationLoading,
  selectParamsAttachment,
} from '../../../selectors/globalSelector';
import { IRequestAttachment } from '../../../middlewares/getStatement';
import { attachFile, cancelSign } from '../../../store/globalStateSlice';
import { Card, Center } from '../../styledComponents';

const ToApplySignification = () => {
  const statement = useSelector(selectParamsAttachment);
  const currentDate = useSelector(selectCurrentDate);
  const formingLoading = useSelector(selectFormingApplicationLoading);
  const dispatch = useDispatch();
  if (formingLoading) {
    return (
      <Card>
        <Center>
          <Preloader />
        </Center>
      </Card>
    );
  }
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
        data={statement ? statement : ({} as IRequestAttachment)}
        hideButtons={['reject', 'rejectManual']}
        title={`Заявление на замену лет для расчёта больничного от ${currentDate}`}
      />
    </>
  );
};

export default ToApplySignification;
