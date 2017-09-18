import React, {Component} from 'react';
import {NavLink, Link} from 'react-router-dom';
import { Button, Container, Menu, Icon, Image } from 'semantic-ui-react';
import ButtonLink from '../../components/ButtonLink';
import {PhoneScreen,PhoneScreenHidden} from 'react-responsive-redux';
class TopNavContainer extends Component {

    render(){
        return (
            <div>
                <Menu fixed='top' size='large' inverted>
                <Container>
                        <PhoneScreen>
                            <Menu.Item className='item'>
                                <Icon name='bars' className="pointer" onClick={this.props.toggle} />
                            </Menu.Item>
                        </PhoneScreen> 
                        <PhoneScreenHidden>
                            <NavLink className='item' activeClassName='teal active' to="/" exact={true}>Home</NavLink>
                        </PhoneScreenHidden>
                        <PhoneScreenHidden>    
                            <NavLink className='item' activeClassName='teal active' to="/todos" exact={true}>Todos</NavLink>
                        </PhoneScreenHidden>   
                        <PhoneScreenHidden>    
                            <NavLink className='item' activeClassName='teal active' to="/contact" exact={true}>Contact</NavLink>
                        </PhoneScreenHidden> 
                        
                        <Menu.Menu position='right'>
                             <PhoneScreenHidden>   
                                <Menu.Item className='item'>
                                    <ButtonLink className="teal" inverted to="/login" exact={true}>Login</ButtonLink>
                                </Menu.Item>
                            </PhoneScreenHidden>
                            <PhoneScreenHidden>        
                                <Menu.Item>
                                    <ButtonLink className="teal" inverted to="/register" exact={true}>Register</ButtonLink>
                                </Menu.Item>
                            </PhoneScreenHidden>
                        </Menu.Menu>
                </Container>
                </Menu>
            </div>
        );
    }
}

export default TopNavContainer;