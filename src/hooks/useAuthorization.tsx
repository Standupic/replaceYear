import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import authorization from '../middlewares/authorization';

const useAuthorization = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  useEffect(() => {
    dispatch(authorization({}));
  }, []);
};

export default useAuthorization;
