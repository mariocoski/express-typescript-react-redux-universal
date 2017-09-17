import React, {Component} from 'react';
import {NavLink, Link} from 'react-router-dom';
import { Button, Container, Menu, Icon } from 'semantic-ui-react';
import ButtonLink from '../../components/ButtonLink';

class SidebarNavContainer extends Component {
    render(){
        return (
            <Menu vertical inverted fluid={true} >
              <Menu.Item name='home' onClick={this.props.toggle}>
                <Icon name='close' /> Close
              </Menu.Item>
              <NavLink className='item' activeClassName='teal active' to="/" exact={true}>Home</NavLink>
              <NavLink className='item' activeClassName='teal active' to="/todos" exact={true}>Todos</NavLink>
              <NavLink className='item' activeClassName='teal active' to="/contact" exact={true}>Contact</NavLink>
              <Menu.Item className='item'>
                          <ButtonLink className="teal fluid" inverted to="/login" exact={true}>Login</ButtonLink>
                        </Menu.Item>
                        <Menu.Item>
                            <ButtonLink className="teal fluid" inverted to="/register" exact={true}>Register</ButtonLink>
                        </Menu.Item>
            </Menu>
        );
    }
}

export default SidebarNavContainer;