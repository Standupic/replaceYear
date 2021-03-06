import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsUserLoaded } from '../selectors/userSelector';
import getHelperList from '../middlewares/getHelperList';

const useHelperList = () => {
  const dispatch = useDispatch();
  const userLoaded = useSelector(selectIsUserLoaded);
  useEffect(() => {
    dispatch(getHelperList({}));
  }, [userLoaded]);
};

export default useHelperList;
