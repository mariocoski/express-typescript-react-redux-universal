import React, {Component} from 'react';
import { Grid,Message, Segment, Header, Button, Form } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

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
                    <Form size='large'>
                    <Segment stacked>
                        <Form.Input
                        fluid
                        icon='user'
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
                        <Button color='teal' fluid size='large'>Login</Button>
                    </Segment>
                    </Form>
                    <Message>
                      New to us? <Link to='/register'>Register</Link>
                    </Message>
                </Grid.Column>
            </Grid>
        );
    }
}
export default LoginContainer;