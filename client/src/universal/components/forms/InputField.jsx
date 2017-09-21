import React from 'react';
import {Form, Input, Label} from  'semantic-ui-react';
import {Field} from 'redux-form';

export default ({input, label, meta: {touched, error}, ...props}) => (
  <Form.Field error={(touched && !!error)}>
    {touched && error && <Label basic color='red' pointing="below">{error}</Label>}
    <Input value={input.value} 
      {...props}
      {...input}
    
      onChange={(params,data) => input.onChange(data.value)}  />
    
   
  </Form.Field>
)


