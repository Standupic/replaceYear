import React from 'react';
import { Employee } from 'juicyfront';
import { useSelector } from 'react-redux';
import { IUser } from 'juicyfront/types/projects.types';
import { selectUser, selectIsUserLoaded } from '../../../selectors/userSelector';

const User = () => {
  const user = useSelector(selectUser);
  const userLoaded = useSelector(selectIsUserLoaded);
  return <>{userLoaded ? <Employee user={user ? user : ({} as IUser)} /> : null}</>;
};

export default User;
