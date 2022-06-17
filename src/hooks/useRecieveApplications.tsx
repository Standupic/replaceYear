import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import receiveApplications from '../middlewares/receiveApplications';

const useReceiveApplications = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(receiveApplications({}));
  }, []);
};

export default useReceiveApplications;
