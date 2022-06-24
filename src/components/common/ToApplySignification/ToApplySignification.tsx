import React, { FC } from 'react';
import { Signification } from 'juicyfront';
import { useSelector } from 'react-redux';
import { selectCurrentDate } from '../../../selectors/globalSelector';
import { IAttachment } from '../../../middlewares/getStatement';
const lodash = require('lodash');

interface IProps {
  attachment?: IAttachment;
  toUpdateAttachment: (props: {
    base64: string;
    cert?: string;
    singBase64?: string;
    fileName: string;
  }) => void;
  cancelSign: () => void;
}

const ToApplySignification: FC<IProps> = ({ attachment, toUpdateAttachment, cancelSign }) => {
  const currentDate = useSelector(selectCurrentDate);
  return (
    <>
      <Signification
        onSignify={(result) => {
          if (lodash.isEmpty(result.file)) {
            cancelSign();
            return;
          }
          if (result) {
            const { file } = result;
            toUpdateAttachment({
              base64: file.base64,
              cert: file.cert,
              singBase64: file.singBase64,
              fileName: file.fileName,
            });
          }
        }}
        onSignCancel={() => {
          cancelSign();
        }}
        data={attachment ? attachment : ({} as IAttachment)}
        hideButtons={['reject', 'rejectManual']}
        title={`Заявление на замену лет для расчёта больничного от ${currentDate}`}
      />
    </>
  );
};

export default ToApplySignification;
