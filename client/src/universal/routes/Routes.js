import React, {Component} from  'react';
import {Route, Redirect} from 'react-router';
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
        <div>
          <Route exact location={location} path='/' component={RouteMap.Home} />
          <Route exact location={location} path='/counter' component={RouteMap.Counter} />
          <Route exact location={location} path='/contact' component={RouteMap.Contact} />
        </div>
      </AppContainer>
    );
  }
}

export default Routes;
