import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsUserLoaded } from '../selectors/userSelector';
import getHelperList from '../middlewares/getHelperList';
import initReplaceYear from '../middlewares/initReplaceYear';

const useHelperList = () => {
  const dispatch = useDispatch();
  const userLoaded = useSelector(selectIsUserLoaded);
  useEffect(() => {
    if (userLoaded) {
      dispatch(initReplaceYear({}));
      // dispatch(getHelperList({}));
    }
  }, [userLoaded]);
};

export default useHelperList;
