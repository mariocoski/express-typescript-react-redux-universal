import React, {Component} from 'react';
import { Grid,Message, Segment, Header, Button, Form , Icon, Divider} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import {LoginForm}  from '../../components/forms';
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
                >
                <Grid.Column style={{ maxWidth: 450 }}>
                    <Header as='h2'   textAlign='center'>
                    {/* <Image src='/logo.png' /> */}
                    {' '} Login
                    </Header>
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