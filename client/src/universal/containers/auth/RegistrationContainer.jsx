import React, {Component} from 'react';
import { Grid,Message, Segment, Header, Button, Form } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class RegistrationContainer extends Component {

    render(){
        return (<Grid
                textAlign='center'
                style={{ height: '100%' }}
                verticalAlign='middle'
                >
                <Grid.Column style={{ maxWidth: 450 }}>
                    <Header as='h2'  textAlign='center'>
                    {' '} Register
                    </Header>
                    <Form size='large'>
                    <Segment stacked>
                        <Form.Input
                            fluid
                            icon='user'
                            iconPosition='left'
                            placeholder='First Name'
                            onChange={e => console.log(e.target.value)}s
                        />
                        <Form.Input
                            fluid
                            icon='user'
                            iconPosition='left'
                            placeholder='Last Name'
                        />
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
                        <Form.Input
                            fluid
                            icon='lock'
                            iconPosition='left'
                            placeholder='Confirm password'
                            type='password'
                        />
                        <Button color='teal' fluid size='large'>Register</Button>
                    </Segment>
                    </Form>
                    <Message>
                      Already have an account? <Link to='/login'>Log in</Link>
                    </Message>
                </Grid.Column>
            </Grid>
        );
    }
}
export default RegistrationContainer;