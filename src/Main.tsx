import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import React, { FC } from 'react';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import singleSpaReact from 'single-spa-react';
import ReactDOM from 'react-dom';
import { FatalError } from 'juicyfront';
import App from './App';
import store from './store';
import { domElementGetter } from './helpers';

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

const reactLifecycles = singleSpaReact({
  React,
  ReactDOM,
  rootComponent: Main,
  domElementGetter: ({ place = 'container' }) => {
    let div = document.getElementById(place);

    if (!div) {
      div = document.createElement('div');
      div.id = place;
    }

    return div;
  },
  errorBoundary(err, info, props) {
    console.log('---------------');
    console.log(err);
    console.log(info);
    console.log(props);
    console.log('---------------');
    // https://reactjs.org/docs/error-boundaries.html
    return <FatalError />;
  },
});

export const bootstrap = reactLifecycles.bootstrap;
export const mount = reactLifecycles.mount;
export const unmount = reactLifecycles.unmount;
