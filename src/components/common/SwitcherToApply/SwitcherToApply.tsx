import React from 'react';
import { useSelector } from 'react-redux';
import { selectAttachmentId, selectIsHandSignature } from '../../../selectors/globalSelector';
import ToApply from '../ToApply';
import ToApplyManually from '../ToApplyManually';

const SwitcherToApply = () => {
  const attachmentId = useSelector(selectAttachmentId);
  const isHandSignature = useSelector(selectIsHandSignature);
  if (attachmentId && !isHandSignature) {
    return <>Цифровая подпись</>;
  }
  if (attachmentId && isHandSignature) {
    return <ToApplyManually />;
  }
  return <ToApply />;
};

export default SwitcherToApply;
