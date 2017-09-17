import React from 'react';
import { Route } from 'react-router';
import { Link } from 'react-router-dom';
import { Button} from 'semantic-ui-react';

const ButtonLink = ({to, exact, children, ...props }) => (
    <Route children={({history})=>{
      return (
        <Button onClick={() => { history.push(to); }} {...props}>{children}</Button>
      )}
    }/>
);
export default ButtonLink;