import React, { FC } from 'react';
import { Notification, Preloader } from 'juicyfront';
import { useSelector } from 'react-redux';
import { selectError } from '../../../selectors/userSelector';
import { Center } from '../../styledComponents';
import { selectInitLoading } from '../../../selectors/globalSelector';

const EntryPoint: FC = ({ children }) => {
  const isError = useSelector(selectError);
  const initLoading = useSelector(selectInitLoading);
  if (isError) {
    const error = isError.map((item, index) => {
      return <Notification key={index} item={{ variant: 'red', title: 'Ошибка', message: item }} />;
    });
    return <Center centerChildren>{error}</Center>;
  }
  return <>{!isError && initLoading ? <Preloader /> : children}</>;
};

export default EntryPoint;
