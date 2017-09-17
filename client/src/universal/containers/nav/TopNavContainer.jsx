import React, {Component} from 'react';
import {NavLink, Link} from 'react-router-dom';
import { Button, Container, Menu, Icon } from 'semantic-ui-react';
import ButtonLink from '../../components/ButtonLink';
import {MobileScreen} from 'react-responsive-redux';
class TopNavContainer extends Component {

    render(){
        return (
            <div>
                <Menu fixed='top' size='large' inverted>
                <Container>
                        {/* <MobileScreen>
                            <Menu.Item className='item'>
                                <Icon name='bars' className="pointer" onClick={this.props.toggle} />
                            </Menu.Item>
                        </MobileScreen>  */}
                     
                        <NavLink className='item' activeClassName='teal active' to="/" exact={true}>Home</NavLink>
                        <NavLink className='item' activeClassName='teal active' to="/todos" exact={true}>Todos</NavLink>
                        <NavLink className='item' activeClassName='teal active' to="/contact" exact={true}>Contact</NavLink>

                        <Menu.Menu position='right'>
                         <Menu.Item className='item'>
                            <ButtonLink className="teal" inverted to="/login" exact={true}>Login</ButtonLink>
                            </Menu.Item>
                            <Menu.Item>
                                <ButtonLink className="teal" inverted to="/register" exact={true}>Register</ButtonLink>
                            </Menu.Item>
                        </Menu.Menu>
                   
                </Container>
                </Menu>
            </div>
        );
    }
}

export default TopNavContainer;