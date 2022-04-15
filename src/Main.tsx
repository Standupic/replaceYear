import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import React, { FC } from 'react';
import { Provider } from 'react-redux';
import App from './App';
import store from './store';
import intercept from './api/interceptor';

/** Подключаем Интерцептор */
// intercept();

const Main: FC = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

export default Main;
