import React, { useEffect, useState } from 'react';
import './App.scss';
import { useSelector, useDispatch } from 'react-redux';
import authorization from './middlewares/authorization';
import { RootState } from './store';
import ModalContainer from './components/common/Modal/Modal';

const App = () => {
  // const name = useSelector((state: RootState) => state.user.name);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(authorization());
  });
  return (
    <>
      <ModalContainer />
      <p>App</p>
    </>
  );
};

export default App;
