import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import React, { FC } from 'react';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import App from './App';
import store from './store';

const Main: FC = () => {
  return (
    <HashRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </HashRouter>
  );
};

export default Main;
