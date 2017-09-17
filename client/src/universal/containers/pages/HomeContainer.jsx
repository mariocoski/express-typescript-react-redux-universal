import React from 'react';
import { Button,  Header,Icon } from 'semantic-ui-react';

const HomeContainer = (props) => (<div>
     <Header
        as='h1'
        content='Imagine-a-Company'
        inverted
        style={{ fontSize: '3.5em', fontWeight: 'normal', marginBottom: 0}}
    />
    <Header
        as='h2'
        content='Always look on the bright sight of life!'
        inverted
        style={{ fontSize: '1.7em', fontWeight: 'normal' }}
    />
    <Button color='teal' size='huge'>
        Learn more &nbsp;
        <Icon name='plane' />
    </Button>
</div>);

export default HomeContainer;