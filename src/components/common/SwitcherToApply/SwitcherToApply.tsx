import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import {
  selectAttachmentId,
  selectIsHandSignature,
  selectIsVisibleFormStatement,
} from '../../../selectors/globalSelector';
import ToFormStatement from '../ToFormStatement';
import ToApplyManually from '../ToApplyManually';
import ToApplySignification from '../ToApplySignification/ToApplySignification';

export interface IPropsSwitcherToApply {
  isDraft?: boolean;
}

const SwitcherToApply: FC<IPropsSwitcherToApply> = ({ isDraft }) => {
  const attachmentId = useSelector(selectAttachmentId);
  const isHandSignature = useSelector(selectIsHandSignature);
  const isVisibleFormStatement = useSelector(selectIsVisibleFormStatement);
  if (!isVisibleFormStatement && attachmentId && !isHandSignature) {
    return <ToApplySignification isDraft={isDraft} />;
  }
  if (!isVisibleFormStatement && attachmentId && isHandSignature) {
    return <ToApplyManually />;
  }
  return <ToFormStatement />;
};

export default SwitcherToApply;
