import React, { useEffect, Suspense } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Preloader, Employee } from 'juicyfront';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import authorization from './middlewares/authorization';
import ModalContainer from './components/common/Modal/Modal';
import Permission from './components/Permission';
import { selectIsUserLoading } from './selectors/userSelector';
import './index.scss';
import UseAuthorization from './hooks/useAuthorization';
import NavigationTabs from './components/common/NavigationTabs';
import MainTittle from './components/common/MainTittle';
import User from './components/common/User';
import { Container, IKeySpacingMap, Stack, Box } from './components/common/Tags';
const Applications = React.lazy(() => import('./pages/applications'));
const CreateApplication = React.lazy(() => import('./pages/createApplication'));

const App = () => {
  UseAuthorization();
  return (
    <Container width={'880px'}>
      <Stack>
        <Box>
          <MainTittle />
        </Box>
        <Box>
          <NavigationTabs />
          <User />
        </Box>
      </Stack>
      <Switch>
        <Route path="/" exact>
          <Suspense fallback={<Preloader />}>
            <CreateApplication />
          </Suspense>
        </Route>
        <Route path="/applications">
          <Suspense fallback={<Preloader />}>
            <Applications />
          </Suspense>
        </Route>
      </Switch>
      <ModalContainer />
      <Permission />
    </Container>
  );
};

export default App;
