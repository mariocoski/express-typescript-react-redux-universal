import React, {Component} from 'react';
import { Header } from 'semantic-ui-react';
class DashboardContainer extends Component {
    
  constructor(){
      super();
  }
  
  render(){
      return (<div>
     <Header
        as='h1'
        content='Dashboard'
        inverted
        style={{ fontSize: '3.5em', fontWeight: 'normal', marginBottom: 0 }}
    />
</div>);
  }
}


export default DashboardContainer;