import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import receiveApplications from '../middlewares/receiveApplications';
import { toggleToContinue } from '../store/globalStateSlice';

const useReceiveApplications = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(receiveApplications({}));
    dispatch(toggleToContinue(false));
  }, []);
};

export default useReceiveApplications;
