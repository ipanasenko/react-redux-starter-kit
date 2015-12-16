import React from 'react';
import ReactDOM from 'react-dom';
import Root from './containers/Root';
import configureStore from './redux/configureStore';

const store = configureStore(window.__INITIAL_STATE__);

// Render the React application to the DOM
ReactDOM.render(
  <Root store={store} />,
  document.getElementById('root')
);
