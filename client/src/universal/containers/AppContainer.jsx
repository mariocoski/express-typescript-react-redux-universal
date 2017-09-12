import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {NavLink} from 'react-router-dom';
class AppContainer extends Component {
  

  render () {
    return (
      <div>
        <div>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/counter">Counter</NavLink>
          <NavLink to="/notfound">Not Found</NavLink>
        </div>
        {this.props.children}
      </div>
    );
  }
}

export default AppContainer;
