import React, { FC } from 'react';
import { Signification } from 'juicyfront';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentDate } from '../../../selectors/globalSelector';
import { IAttachment } from '../../../middlewares/getStatement';
import { cancelSign } from '../../../store/globalStateSlice';

interface IProps {
  attachment?: IAttachment;
  toUpdateAttachment: (props: { base64: string; cert?: string; singBase64?: string }) => void;
}

const ToApplySignification: FC<IProps> = ({ attachment, toUpdateAttachment }) => {
  const currentDate = useSelector(selectCurrentDate);
  const dispatch = useDispatch();
  return (
    <>
      <Signification
        onSignify={(result) => {
          if (result) {
            const { file } = result;
            toUpdateAttachment({
              base64: file.base64,
              cert: file.cert,
              singBase64: file.singBase64,
            });
          }
        }}
        onSignCancel={() => {
          dispatch(cancelSign());
        }}
        data={attachment ? attachment : ({} as IAttachment)}
        hideButtons={['reject', 'rejectManual']}
        title={`Заявление на замену лет для расчёта больничного от ${currentDate}`}
      />
    </>
  );
};

export default ToApplySignification;
