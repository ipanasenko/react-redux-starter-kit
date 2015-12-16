import React from 'react';
import { Provider } from 'react-redux';
import Hi from 'components/hi';

export default class Root extends React.Component {
  static propTypes = {
    store: React.PropTypes.object.isRequired
  };

  get content () {
    return (
      <div>
        <Hi />
      </div>
    );
  }

  get devTools () {
    if (__DEBUG_NEW_WINDOW__) {
      require('../redux/utils/createDevToolsWindow')(this.props.store);
    } else {
      const DevTools = require('containers/DevTools');
      return <DevTools />;
    }
  }

  render () {
    return (
      <Provider store={this.props.store}>
        <div style={{ height: '100%' }}>
          {this.content}
          {__DEBUG__ && this.devTools}
        </div>
      </Provider>
    );
  }
}
