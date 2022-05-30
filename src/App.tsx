import React, { Suspense, useEffect } from 'react';
import { Preloader } from 'juicyfront';
import { Route, Switch } from 'react-router-dom';
import ModalContainer from './components/common/Modal/Modal';
import './index.scss';
import useAuthorization from './hooks/useAuthorization';
import NavigationTabs from './components/common/NavigationTabs';
import MainTittle from './components/common/MainTittle';
import User from './components/common/User';
import { Stack, Box } from './components/styledComponents';
import EntryPoint from './components/common/EntryPoint';
const Applications = React.lazy(() => import('./pages/applications'));
const CreateApplication = React.lazy(() => import('./pages/createApplication'));

const App = () => {
  useEffect(() => {
    console.warn('================================================================');
    console.log(
      `%c Активное приложение ${process.env.REACT_APP_NAME}`,
      'color:DodgerBlue;font-size:large',
    );
    console.log(`%c ${process.env.REACT_APP_V}`, 'color:red;font-size:large');
    console.warn('================================================================');
  }, []);

  useAuthorization();
  // useHelperList();
  return (
    <Box width={'880px'}>
      <EntryPoint>
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
      </EntryPoint>
    </Box>
  );
};

export default App;
