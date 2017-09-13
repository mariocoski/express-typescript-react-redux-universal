import React from 'react';
import {render} from 'react-dom';
import {AppContainer} from 'react-hot-loader';
import  App from './containers/AppContainer';
import { Provider } from 'react-redux';
import configureStore from '../universal/store';
import createHistory from 'history/createBrowserHistory';
import '../scss/main.scss';

const history = createHistory();
const store = configureStore(history);

const renderApp = (Component) => {
    render(
      <AppContainer>
        <Provider store={store}>
          <Component history={history} />
        </Provider>
      </AppContainer>,
      document.getElementById('root')
    );
}

renderApp(App);

if (module.hot) {
  module.hot.accept('./containers/AppContainer.js', () => {
    const nextApp = require('./containers/AppContainer.js');
    renderApp(nextApp);
  });
 
}
