import React, {Component} from 'react';
import {NavLink, Link, withRouter} from 'react-router-dom';
import { Button, Container, Menu, Icon } from 'semantic-ui-react';
import ButtonLink from '../../components/ButtonLink';
import {connect} from 'react-redux';
import {logoutUser} from '../../redux/modules/auth/login';
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
                
                {this.props.isAuthenticated && 
                    <Menu.Item className='item'>
                        <ButtonLink className="inverted teal fluid"  to="/dashboard" exact={true}>Dashboard</ButtonLink>
                    </Menu.Item>
                }
                {this.props.isAuthenticated && 
                    <Menu.Item className='item'>
                        <ButtonLink className="inverted teal fluid"  onClick={this.props.logout} exact={true}>Log out</ButtonLink>
                    </Menu.Item>
                }
                {!this.props.isAuthenticated &&    
                    <Menu.Item className='item'>
                    <ButtonLink className="inverted teal fluid"  to="/login" exact={true}>Login</ButtonLink>
                    </Menu.Item>
                }
                {!this.props.isAuthenticated &&    
                    <Menu.Item>
                        <ButtonLink className="inverted teal fluid"  to="/register" exact={true}>Register</ButtonLink>
                    </Menu.Item>
                }
            </Menu>
        );
    }
}


export default withRouter(connect(
    ({auth})=>({isAuthenticated : auth.isLoggedIn}),
    (dispatch,ownProps) => ({ logout : () => dispatch(logoutUser(ownProps.history)) })
)(SidebarNavContainer));