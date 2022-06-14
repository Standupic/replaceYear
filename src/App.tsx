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
import AccessibleSection from './components/AccessibleSection';
const Applications = React.lazy(() => import('./pages/applications'));
const CreateApplication = React.lazy(() => import('./pages/createApplication'));
const ViewApplication = React.lazy(() => import('./pages/viewApplication'));

export enum IRoutes {
  createApplication = '/replaceyears',
  listApplications = '/replaceyears/applications',
  viewApplication = '/replaceyears/application/:id',
}

const App = () => {
  useNotificationApp();
  useAuthorization();
  return (
    <Box width={'880px'}>
      <EntryPoint>
        <Stack>
          <AccessibleSection blackList={[IRoutes.listApplications, IRoutes.createApplication]}>
            <Box>
              <MainTittle />
            </Box>
          </AccessibleSection>
          <AccessibleSection blackList={[IRoutes.viewApplication]}>
            <Box>
              <NavigationTabs />
            </Box>
          </AccessibleSection>
        </Stack>
        <Switch>
          <Suspense fallback={<Preloader />}>
            <Route path={IRoutes.createApplication} component={CreateApplication} exact />
            <Route path={IRoutes.listApplications} component={Applications} />
            <Route path={IRoutes.viewApplication} component={ViewApplication} />
          </Suspense>
        </Switch>
        <ModalContainer />
      </EntryPoint>
    </Box>
  );
};

export default App;
