import React from 'react';
import ReactDOM from 'react-dom';
import singleSpaReact from 'single-spa-react';
import { FatalError } from 'juicyfront';
import Main from './Main';
import { domElementGetter } from './helpers';

const reactLifecycles = singleSpaReact({
  React,
  ReactDOM,
  rootComponent: Main,
  domElementGetter: domElementGetter,
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

export const { bootstrap } = reactLifecycles;
export const { mount } = reactLifecycles;
export const { unmount } = reactLifecycles;
