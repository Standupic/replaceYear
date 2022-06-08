import React, { FC } from 'react';
import { useLocation } from 'react-router-dom';

interface IProps {
  notIncludes: string[];
}

const AccessibleSection: FC<IProps> = ({ notIncludes, children }) => {
  const location = useLocation();
  if (notIncludes.includes(location.pathname)) {
    return null;
  }
  return <>{children}</>;
};

export default AccessibleSection;
