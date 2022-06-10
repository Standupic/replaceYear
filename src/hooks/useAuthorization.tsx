import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import authorization from '../middlewares/authorization';

const useAuthorization = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const promise = dispatch(authorization({}));
    return () => {
      // @ts-ignore
      promise.abort();
    };
  }, []);
};

export default useAuthorization;
