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
const ViewApplication = React.lazy(() => import('./pages/ViewApplication'));

const App = () => {
  useNotificationApp();
  useAuthorization();
  return (
    <Box width={'880px'}>
      <Stack>
        <AccessibleSection notIncludes={['/replaceyears/applications', '/replaceyears']}>
          <Box>
            <MainTittle />
          </Box>
        </AccessibleSection>
        <AccessibleSection notIncludes={['/replaceyears/application/:id']}>
          <Box>
            <NavigationTabs />
          </Box>
        </AccessibleSection>
      </Stack>
      <EntryPoint>
        <Switch>
          <Suspense fallback={<Preloader />}>
            <Route path="/replaceyears" component={CreateApplication} exact />
            <Route path="/replaceyears/applications" component={Applications} />
            <Route path="/replaceyears/application/:id" component={ViewApplication} />
          </Suspense>
        </Switch>
        <ModalContainer />
      </EntryPoint>
    </Box>
  );
};

export default App;
