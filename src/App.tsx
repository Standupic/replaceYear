import React, { Suspense } from 'react';
import { Preloader } from 'juicyfront';
import { Route, Switch } from 'react-router-dom';
import ModalContainer from './components/common/Modal/Modal';
import './index.scss';
import useAuthorization from './hooks/useAuthorization';
import NavigationTabs from './components/common/NavigationTabs';
import MainTittle from './components/common/MainTittle';
import { Stack, Box } from './components/styledComponents';
import EntryPoint from './components/common/EntryPoint';
import useNotificationApp from './hooks/useNotificationApp';
const Applications = React.lazy(() => import('./pages/applications'));
const CreateApplication = React.lazy(() => import('./pages/createApplication'));

const App = () => {
  useNotificationApp();
  useAuthorization();
  return (
    <Box width={'880px'}>
      <EntryPoint>
        <Stack>
          <Box>
            <MainTittle />
          </Box>
          <Box>
            <NavigationTabs />
          </Box>
        </Stack>
        <Switch>
          <Suspense fallback={<Preloader />}>
            <Route path="/replaceyears" component={CreateApplication} exact />
            <Route path="/replaceyears/applications" component={Applications} />
          </Suspense>
        </Switch>
        <ModalContainer />
      </EntryPoint>
    </Box>
  );
};

export default App;
