import React from 'react';
import { reduxForm, Field } from 'redux-form';
const validate = values => {
  const errors = {}
 
  return errors;
}

const renderField = field => (
  <div>
    <label>{field.placeholder}</label>
    <div>
      <input {...field.input}/>
      {field.touched && field.error && <span>{field.error}</span>}
    </div>
  </div>
)

const LoginForm = (props) => {
    const { error, handleSubmit, pristine, reset, submitting } = props
    return (
      <form onSubmit={handleSubmit}>
        <Field name="username" type="text" component={renderField} placeholder="Username"/>
        <Field name="password" type="password" component={renderField} placeholder="Password"/>
        {error && <strong>{error}</strong>}
        <div>
          <button type="submit" disabled={submitting}>Log In</button>
          <button type="button" disabled={pristine || submitting} onClick={reset}>Clear Values</button>
        </div>
      </form>
    )
  }
  
  export default reduxForm({
    form: 'loginForm' 
  })(LoginForm)