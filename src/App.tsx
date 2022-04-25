import React, { Suspense } from 'react';
import { Preloader } from 'juicyfront';
import { Route, Switch } from 'react-router-dom';
import ModalContainer from './components/common/Modal/Modal';
import './index.scss';
import UseAuthorization from './hooks/useAuthorization';
import NavigationTabs from './components/common/NavigationTabs';
import MainTittle from './components/common/MainTittle';
import User from './components/common/User';
import { Stack, Box } from './components/styledComponents';
const Applications = React.lazy(() => import('./pages/applications'));
const CreateApplication = React.lazy(() => import('./pages/createApplication'));

const App = () => {
  UseAuthorization();
  return (
    <Box width={'880px'}>
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
          <Suspense fallback={<Preloader />}>{<CreateApplication />}</Suspense>
        </Route>
        <Route path="/applications">
          <Suspense fallback={<Preloader />}>
            <Applications />
          </Suspense>
        </Route>
      </Switch>
      <ModalContainer />
    </Box>
  );
};

export default App;
