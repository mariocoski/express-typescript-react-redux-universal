import React, {Component} from  'react';
import {Route, Switch, Redirect} from 'react-router';
import PropTypes from 'prop-types';
import * as RouteMap from '../routes/static.js';

// This is used in production for code splitting via `wepback.config.server.js`
// import * as RouteMap from 'universal/routes/async.js';

// Containers
import AppContainer from 'universal/containers/AppContainer';
// import PrivateRouteContainer from 'universal/containers/PrivateRoute/PrivateRouteContainer.js';

class Routes extends Component {
  render () {
    const {
      location
    } = this.props;

    return (
      <AppContainer>
        <Switch>
          <Route exact location={location} path='/' component={RouteMap.Home} />
          <Route exact location={location} path='/todos' component={RouteMap.Todos} />
          <Route exact location={location} path='/contact' component={RouteMap.Contact} />
          <Route exact location={location} path='/login' component={RouteMap.Login} />
          <Route exact location={location} path='/register' component={RouteMap.Register} />
          <Route component={RouteMap.NotFound} />
        </Switch>
      </AppContainer>
    );
  }
}

export default Routes;
