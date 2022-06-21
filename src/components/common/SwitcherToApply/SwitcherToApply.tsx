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
  toUpdateAttachment: (props: { base64: string; cert?: string; singBase64?: string }) => void;
  manuallyLoading: boolean;
}

const SwitcherToApply: FC<IPropsSwitcherToApply> = ({
  isHandSignature,
  isVisibleFormStatement,
  attachmentId,
  attachment,
  toFormStatement,
  toUpdateAttachment,
  manuallyLoading,
}) => {
  if (!isVisibleFormStatement && attachmentId && !isHandSignature) {
    return <ToApplySignification attachment={attachment} toUpdateAttachment={toUpdateAttachment} />;
  }
  if (!isVisibleFormStatement && attachmentId && isHandSignature) {
    return (
      <ToApplyManually
        toUpdateAttachment={toUpdateAttachment}
        attachmentId={attachmentId}
        loading={manuallyLoading}
      />
    );
  }
  return <ToFormStatement toFormStatement={toFormStatement} />;
};

export default SwitcherToApply;
