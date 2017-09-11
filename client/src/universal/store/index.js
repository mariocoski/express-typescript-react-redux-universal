import { createStore,combineReducers,applyMiddleware } from 'redux';
import { ConnectedRouter, routerReducer, routerMiddleware } from 'react-router-redux';
import * as reducers from '../reducers';
  
  export default (history) => {
    const middleware = routerMiddleware(history);
  
    const store = createStore(combineReducers({
      ...reducers,
      router: routerReducer
    }), applyMiddleware(middleware));
  
    if (module.hot) {
       module.hot.accept('../reducers', () => {
         const nextReducers = require('../reducers');
         const rootReducer = combineReducers({
           ...nextReducers,
           router: routerReducer
         });
         store.replaceReducer(rootReducer);
       });
    }
    return store;
  }
  