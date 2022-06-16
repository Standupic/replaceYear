import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { reset } from '../store/globalStateSlice';

const useResetApp = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    return () => {
      dispatch(reset());
    };
  }, []);
};

export default useResetApp;
