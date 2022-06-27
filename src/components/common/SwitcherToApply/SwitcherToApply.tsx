import React, { FC } from 'react';
import ToFormStatement from '../ToFormStatement';
import ToApplyManually from '../ToApplyManually';
import ToApplySignification from '../ToApplySignification/ToApplySignification';
import { IAttachment } from '../../../middlewares/getStatement';

export interface IPropsSwitcherToApply {
  isHandSignature?: boolean;
  isVisibleFormStatement: boolean;
  attachmentId: string;
  attachment?: IAttachment;
  toFormStatement: () => void;
  toUpdateAttachment: (props: {
    base64: string;
    cert?: string;
    singBase64?: string;
    fileName?: string;
  }) => void;
  cancelSign: () => void;
  toFormLoading: boolean;
  getStatementManually: (id: string) => void;
  pdfFileLoading: boolean;
}

const SwitcherToApply: FC<IPropsSwitcherToApply> = ({
  isHandSignature,
  isVisibleFormStatement,
  attachmentId,
  attachment,
  toFormStatement,
  toUpdateAttachment,
  cancelSign,
  toFormLoading,
  getStatementManually,
  pdfFileLoading,
}) => {
  if (!isVisibleFormStatement && attachmentId && !isHandSignature) {
    return (
      <ToApplySignification
        attachment={attachment}
        toUpdateAttachment={toUpdateAttachment}
        cancelSign={cancelSign}
      />
    );
  }
  if (!isVisibleFormStatement && attachmentId && isHandSignature) {
    return (
      <ToApplyManually
        toUpdateAttachment={toUpdateAttachment}
        attachmentId={attachmentId}
        attachment={attachment}
        reset={cancelSign}
        getStatement={getStatementManually}
        pdfLoading={pdfFileLoading}
      />
    );
  }
  return <ToFormStatement toFormStatement={toFormStatement} loading={toFormLoading} />;
};

export default SwitcherToApply;
