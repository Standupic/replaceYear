import React, { FC } from 'react';
import { useLocation } from 'react-router-dom';
import { matchPath } from 'react-router';
interface IProps {
  notIncludes: string[];
}

const AccessibleSection: FC<IProps> = ({ notIncludes, children }) => {
  const location = useLocation();
  const match = matchPath(location.pathname, {
    path: notIncludes,
  });
  if (match?.isExact) {
    return null;
  }
  return <>{children}</>;
};

export default AccessibleSection;
