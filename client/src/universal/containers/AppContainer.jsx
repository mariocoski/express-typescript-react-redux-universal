import React, {Component} from 'react';
import TopNavContainer from './nav/TopNavContainer.jsx';
import SidebarNavContainer from './nav/SidebarNavContainer';
import ReduxToastr from 'react-redux-toastr'
import { Sidebar,Container} from 'semantic-ui-react';
class AppContainer extends Component {
 
  constructor(){
    super();
  }
  state = { visible: false }

  toggleVisibility = () => {
    this.setState({ visible: !this.state.visible });
  }

  closeIfVisible(){
    if(this.state.visible){
      this.setState({visible:false});
    }
  }

  render () {
    const { visible } = this.state
    return (<div>
         <Sidebar.Pushable>
          <Sidebar animation='overlay' visible={visible}>
            <SidebarNavContainer toggle={this.toggleVisibility.bind(this)} />
          </Sidebar>
          <Sidebar.Pusher className="pusher-wrapper" onClick={this.closeIfVisible.bind(this)}>
             <TopNavContainer toggle={this.toggleVisibility.bind(this)} />
            <Container>{this.props.children}</Container> 
            <ReduxToastr
              timeOut={4000}
              newestOnTop={true}
              preventDuplicates
              position="bottom-left"
              transitionIn="fadeIn"
              transitionOut="fadeOut"/>
          </Sidebar.Pusher>
        </Sidebar.Pushable> 
      </div>);
  }
}

export default AppContainer;
