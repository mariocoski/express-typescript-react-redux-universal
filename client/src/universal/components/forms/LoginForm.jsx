import React from 'react';
import { Link } from 'react-router-dom';
import { reduxForm, Field } from 'redux-form';
import InputField  from './InputField.jsx';
import { Button, Segment, Form, Divider, Icon } from 'semantic-ui-react';
import { toastr } from 'react-redux-toastr';
const validate = values => {
  const errors = {}
  
  if (!values.email) {
    errors.email = 'Email is required'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }
  if (!values.password) {
    errors.password = 'Password is required'
  } 
  return errors;
}

const LoginForm = (props) => {
    const { error, handleSubmit, pristine, reset, submitting } = props
    return (
        <Form size='large'  onSubmit={handleSubmit}>
            <Segment stacked>
                 {error && <strong>{error}</strong>}
            
                <Field name="email" fluid 
                       id="login-email"
                       component={ InputField} 
                       icon='mail'
                       type='text'
                       iconPosition='left'
                       placeholder='E-mail address'
                       label="E-mail address" 
                />
                <Field name="password" fluid 
                       id="login-password"
                       component={ InputField} 
                       icon='lock'
                       type='password'
                       iconPosition='left'
                       placeholder='Password'
                       label="Password" 
                />
            
                <Link to='/forgotten-password'>Forgotten password?</Link>
            
                <Button className='button-space-vertical' color='teal' fluid size='large' 
                    onClick={() => toastr.error('Error', 'Your input is invalid!')}>
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
  
  export default reduxForm({
    form: 'loginForm',
    validate
  })(LoginForm)