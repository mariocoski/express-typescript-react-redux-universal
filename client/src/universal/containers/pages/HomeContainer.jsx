import React from 'react';
import { Button,  Header,Icon } from 'semantic-ui-react';

const HomeContainer = (props) => (<div>
     <Header
        as='h2'
        content='Universal App'
        inverted
        style={{ fontSize: '3.5em', fontWeight: 'normal', marginBottom: 0}}
    />
    <Header
        as='h3'
        content='Technologies used:'
        inverted
        style={{ fontSize: '1.7em', fontWeight: 'normal' }}
    />
    <p>
        <ul>
            <li>react</li>
            <li>redux</li>
            <li>react-redux</li>
            <li>redux-form</li>
            <li>react-router</li>
            <li>JSON Web Tokens</li>
            <li>Node.js</li>
            <li>Express</li>
        </ul>
    </p>
</div>);

export default HomeContainer;