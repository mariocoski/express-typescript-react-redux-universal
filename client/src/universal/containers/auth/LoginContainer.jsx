import React, {Component} from 'react';
import { Grid,Message, Segment, Header, Button,Label, Form ,Input, Icon, Divider} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import LoginForm from '../../components/forms/LoginForm.jsx';
import InputField from '../../components/forms/InputField.jsx';
import {login} from '../../redux/actions';
import {connect} from 'react-redux';
import { reduxForm,Field } from 'redux-form';
import { loginUser } from '../../redux/modules/auth/login';

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

const LoginFormContainer = reduxForm({
  form: 'loginForm',  // a unique identifier for this form
  validate
})(LoginForm);

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
                    <LoginFormContainer 
                        onSubmit={this.props.loginUser}  
                        InputGenerator={Field} 
                   />
                     <Message>
                      New to us? <Link to='/register'>Register</Link>
                    </Message>
                </Grid.Column>
            </Grid>
        );
    }
}
export default connect(null, (dispatch,ownProps)=> {
    return {
        loginUser: (values) => dispatch(loginUser(ownProps.history,values))
    }
})(LoginContainer);