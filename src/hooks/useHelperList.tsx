import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsUser } from '../selectors/userSelector';
import getHelperList from '../middlewares/getHelperList';
import initReplaceYear from '../middlewares/initReplaceYear';

const useHelperList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getHelperList());
    dispatch(initReplaceYear());
  }, []);
};

export default useHelperList;
