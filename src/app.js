import React from 'react';
import ReactDOM from 'react-dom';
import Root from './containers/Root';
import configureStore from './redux/configureStore';

const store = configureStore(window.__INITIAL_STATE__);

// We render the DevTools window here rather than in the Root component
// because we need access to the store but want this logic to be removed via
// uglification and dead code removal when __DEBUG_NW__ is false, which
// wouldn't be possible if it was handled via a React component prop.
if (__DEBUG__ && __DEBUG_NEW_WINDOW__) {
  require('./redux/utils/createDevToolsWindow')(store);
}

// Render the React application to the DOM
ReactDOM.render(
  <Root store={store} />,
  document.getElementById('root')
);
