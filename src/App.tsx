import React, { useEffect, Suspense } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Preloader } from 'juicyfront';
import { Route, Switch, Redirect } from 'react-router-dom';
import authorization from './middlewares/authorization';
import ModalContainer from './components/common/Modal/Modal';
import Permission from './components/Permission';
import { selectIsUserLoading } from './selectors/userSelector';
import './index.scss';

const App = () => {
  const isUserLoading = useSelector(selectIsUserLoading);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(authorization());
  });
  return (
    <>
      {/*<Switch>*/}
      {/*  <Route path="/" exact>*/}
      {/*    <Suspense fallback={<Preloader />}>*/}
      {/*      <p>page1</p>*/}
      {/*    </Suspense>*/}
      {/*  </Route>*/}
      {/*  <Route path="/client-process">*/}
      {/*    <Suspense fallback={<Preloader />}>*/}
      {/*      <p>page2</p>*/}
      {/*    </Suspense>*/}
      {/*  </Route>*/}
      {/*</Switch>*/}
      <ModalContainer />
      <Permission />
      <p>App</p>
    </>
  );
};

export default App;
