import React from 'react'
import { Route, Redirect } from 'react-router-dom';
import {connect} from 'react-redux';

const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => (
  <Route {...rest} render={props => (
    isAuthenticated ? (
      <Component {...props}/>
    ) : (
      <Redirect to={{
        pathname: '/login',
        state: { from: props.location }
      }}/>
    )
  )}/>
);

const connectStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isLoggedIn
  }
}

export default connect(connectStateToProps)(PrivateRoute);
