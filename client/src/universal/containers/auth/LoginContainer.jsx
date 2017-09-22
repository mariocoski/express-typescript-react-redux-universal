import React, {Component} from 'react';
import { Grid,Message, Segment, Header, Button, Form , Icon, Divider} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import {LoginForm}  from '../../components/forms';
import {login} from '../../redux/actions.js';
import {connect} from 'react-redux';
import { SubmissionError } from 'redux-form'
import { loginUser } from '../../redux/modules/auth/login.js';
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

class LoginContainer extends Component {
   
    render(){
        console.log('func', this.props.loginUser);
        return (<Grid
                textAlign='center'
                style={{ height: '100%' }}
                >
                <Grid.Column style={{ maxWidth: 450 }}>
                    <Header as='h2'   textAlign='center'>
                    {/* <Image src='/logo.png' /> */}
                    {' '} Login
                    </Header>
                    <LoginForm handleSubmit={this.props.loginUser} ></LoginForm>
                    <Message>
                      New to us? <Link to='/register'>Register</Link>
                    </Message>
                </Grid.Column>
            </Grid>
        );
    }
}
export default connect(null, (dispatch)=> {
    return {
        loginUser: (values) => dispatch(loginUser(values))
    }
})(LoginContainer);