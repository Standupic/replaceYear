import React, { FC } from 'react';
import { Notification, Preloader } from 'juicyfront';
import { useSelector } from 'react-redux';
import { selectIsUserLoading, selectError } from '../../../selectors/userSelector';
import { Center } from '../../styledComponents';

const EntryPoint: FC = ({ children }) => {
  const isLoading = useSelector(selectIsUserLoading);
  const isError = useSelector(selectError);
  if (!isLoading && isError) {
    const error = isError.map((item, index) => {
      return <Notification key={index} item={{ variant: 'red', title: 'Ошибка', message: item }} />;
    });
    return <Center centerChildren>{error}</Center>;
  }
  return <>{isLoading && !isError ? <Preloader /> : children}</>;
};

export default EntryPoint;
