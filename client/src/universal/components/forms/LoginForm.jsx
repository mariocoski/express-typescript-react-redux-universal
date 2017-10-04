import React from 'react';
import { Link } from 'react-router-dom';
import InputField  from './InputField.jsx';
import { Button, Segment, Form, Divider, Icon } from 'semantic-ui-react';

import {API_URL} from '../../constants';

const LoginForm = (props) => {
  const { handleSubmit, pristine, reset, error, InputGenerator } = props;
  return (
  
    <Form size='large' onSubmit={handleSubmit} action={`${API_URL}/auth/login`} method="POST">
      <Segment stacked>
 
      <InputGenerator name="email" fluid 
            id="login-email"
            component={ InputField} 
            icon='mail'
            type='text'
            iconPosition='left'
            placeholder='E-mail address'
            label="E-mail address" 
     />
      <InputGenerator name="password" fluid 
            id="login-password"
            component={ InputField} 
            icon='lock'
            type='password'
            iconPosition='left'
            placeholder='Password'
            label="Password" 
     />
 
     <Link to='/forgotten-password'>Forgotten password?</Link>
 
     <Button className='button-space-vertical' color='teal' fluid size='large'>
         Login
     </Button>
     <Divider horizontal>Or</Divider>
     <Button className='button-space-vertical' onClick={(e)=>{ e.preventDefault() }} fluid color='facebook'>
     <Icon name='facebook' /> Login with Facebook
     </Button>
     <Button className='button-space-vertical' onClick={(e)=>{ e.preventDefault() }} fluid color='twitter'>
     <Icon name='twitter' /> Login with Twitter
     </Button>
     <Button className='button-space-vertical' onClick={(e)=>{ e.preventDefault() }} fluid color='google plus'>
     <Icon name='google plus' /> Login with Google Plus
     </Button>
 </Segment>
 </Form>
  )
}
export default LoginForm;