import { createStore,combineReducers,applyMiddleware } from 'redux';
import { ConnectedRouter, routerReducer, routerMiddleware } from 'react-router-redux';
import reducers from './reducers';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

  export default (history) => {
    const middleware = routerMiddleware(history);
    const store = createStore(combineReducers({
      ...reducers,
      router: routerReducer
    }), applyMiddleware(middleware,logger,thunk));

    if (module.hot) {
       module.hot.accept('./reducers', () => {
         const nextReducers = require('./reducers');
         const rootReducer = combineReducers({
           ...nextReducers,
           router: routerReducer
         });
         store.replaceReducer(rootReducer);
       });
    }
    return store;
  }
  