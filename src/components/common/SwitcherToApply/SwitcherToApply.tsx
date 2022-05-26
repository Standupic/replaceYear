import React from 'react';
import { useSelector } from 'react-redux';
import { selectAttachmentId, selectIsHandSignature } from '../../../selectors/globalSelector';
import ToFormStatement from '../ToFormStatement';
import ToApplyManually from '../ToApplyManually';

const SwitcherToApply = () => {
  const attachmentId = useSelector(selectAttachmentId);
  const isHandSignature = useSelector(selectIsHandSignature);
  if (attachmentId && !isHandSignature) {
    return <ToApplyManually />;
  }
  if (attachmentId && isHandSignature) {
    return <ToApplyManually />;
  }
  return <ToFormStatement />;
};

export default SwitcherToApply;
