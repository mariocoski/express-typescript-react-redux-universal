import React, {Component} from 'react';
import { Grid,Message, Segment, Header, Button, Form , Icon, Divider} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { toastr } from 'react-redux-toastr';
import LoginForm  from '../../components/forms/LoginForm';
import {login} from '../../actions';

import { SubmissionError } from 'redux-form'

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

function submit(values) {
    console.log(values);
  return sleep(1000) // simulate server latency
    .then(() => {
      if (![ 'john', 'paul', 'george', 'ringo' ].includes(values.username)) {
        throw new SubmissionError({ username: 'User does not exist', _error: 'Login failed!' })
      } else if (values.password !== 'redux-form') {
        throw new SubmissionError({ password: 'Wrong password', _error: 'Login failed!' })
      } else {
        window.alert(`You submitted:\n\n${JSON.stringify(values, null, 2)}`)
      }
    })
}
class LoginContainer extends Component {

    render(){
        return (<Grid
                textAlign='center'
                style={{ height: '100%' }}
                verticalAlign='middle'
                >
                <Grid.Column style={{ maxWidth: 450 }}>
                    <Header as='h2'  textAlign='center'>
                    {/* <Image src='/logo.png' /> */}
                    {' '} Login
                    </Header>
                   
                    {/* <Form size='large'>
                    <Segment stacked>
                        <Form.Input
                        fluid
                        icon='mail'
                        iconPosition='left'
                        placeholder='E-mail address'
                        />
                        <Form.Input
                        fluid
                        icon='lock'
                        iconPosition='left'
                        placeholder='Password'
                        type='password'
                        />
                        <Link to='/forgotten-password'>Forgotten password?</Link>
                     
                        <Button className='button-space-vertical' color='teal' fluid size='large' 
                            onClick={() => toastr.error('The title', 'The message')}>
                            Login
                        </Button>
                        <Divider horizontal>Or</Divider>
                        <Button className='button-space-vertical' fluid color='facebook'>
                        <Icon name='facebook' /> Login with Facebook
                        </Button>
                        <Button className='button-space-vertical' fluid color='twitter'>
                        <Icon name='twitter' /> Login with Twitter
                        </Button>
                        <Button className='button-space-vertical' fluid color='google plus'>
                        <Icon name='google plus' /> Login with Google Plus
                        </Button>
                    </Segment>
                    </Form> */}
                    <LoginForm onSubmit={submit} ></LoginForm>
                    <Message>
                      New to us? <Link to='/register'>Register</Link>
                    </Message>
                </Grid.Column>
            </Grid>
        );
    }
}
export default LoginContainer;