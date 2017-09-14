import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {NavLink} from 'react-router-dom';
import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  List,
  Menu,
  Segment,
  Visibility,
} from 'semantic-ui-react';

class AppContainer extends Component {
  

  render () {
    return (
      <div>
        <div>
        <Menu fixed='top' size='large' inverted={true}>
          <Container>
            <Menu.Item as='li' active color='teal'>
              <NavLink activeClassName="teal" to="/">Home</NavLink>
            </Menu.Item>
            <Menu.Item as='li'>
             <NavLink activeClassName="teal" to="/counter">Counter</NavLink>
            </Menu.Item>
            <Menu.Item as='li'>
              <NavLink activeClassName="teal" to="/contact">Contact</NavLink>
            </Menu.Item>
            <Menu.Menu position='right'>
              <Menu.Item className='item'>
                <Button as='li' color='teal' inverted>Log in</Button>
              </Menu.Item>
              <Menu.Item>
                <Button as='li' color='teal' inverted>Sign Up</Button>
              </Menu.Item>
            </Menu.Menu>
          </Container>
        </Menu>
        </div>
        <Container text>
              {this.props.children}
        </Container>
       
      </div>
    );
  }
}

export default AppContainer;
