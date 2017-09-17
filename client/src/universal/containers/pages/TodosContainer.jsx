import React from 'react';
import { Header } from 'semantic-ui-react';

const Todos = (props) => (<div>
     <Header
        as='h1'
        content='Todos'
        inverted
        style={{ fontSize: '3.5em', fontWeight: 'normal', marginBottom: 0 }}
    />
</div>);

export default Todos;