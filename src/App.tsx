import React, { Suspense } from 'react';
import { Preloader } from 'juicyfront';
import { Route, Switch } from 'react-router-dom';
import './index.scss';
import useAuthorization from './hooks/useAuthorization';
import NavigationTabs from './components/common/NavigationTabs';
import { Stack, Box } from './components/styledComponents';
import EntryPoint from './components/common/EntryPoint';
import useNotificationApp from './hooks/useNotificationApp';
import AccessibleSection from './components/AccessibleSection';
import useResetApp from './hooks/useResetApp';
import ModalCreateApplication from './components/common/Modal/Modal';
import useHelperList from './hooks/useHelperList';
const Applications = React.lazy(() => import('./pages/applications'));
const CreateApplication = React.lazy(() => import('./pages/createApplication'));
const ViewApplication = React.lazy(() => import('./pages/viewApplication'));
const DraftApplication = React.lazy(() => import('./pages/draftApplication'));

export enum IRoutes {
  createApplication = '/replaceyears',
  listApplications = '/replaceyears/applications',
  viewApplication = '/replaceyears/application/:id',
  draftApplication = '/replaceyears/draft/:id',
}

const App = () => {
  useNotificationApp();
  useAuthorization();
  useResetApp();
  return (
    <Box width={'880px'}>
      <EntryPoint>
        <Stack>
          <AccessibleSection blackList={[IRoutes.viewApplication, IRoutes.draftApplication]}>
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
            <Route path={IRoutes.draftApplication} component={DraftApplication} />
          </Suspense>
        </Switch>
        <ModalCreateApplication />
      </EntryPoint>
    </Box>
  );
};

export default App;
