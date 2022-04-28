import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsUser } from '../selectors/userSelector';
import getHelperList from '../middlewares/getHelperList';
import initReplaceYear from '../middlewares/initReplaceYear';
const useHelperList = () => {
  const user = useSelector(selectIsUser);
  const dispatch = useDispatch();
  useEffect(() => {
    console.log(user, 'user helperList');
    if (user) {
      dispatch(getHelperList());
      dispatch(initReplaceYear());
    }
  }, [user]);
};

export default useHelperList;
