import React, {Component} from 'react';
import TopNavContainer from './nav/TopNavContainer.jsx';
import SidebarNavContainer from './nav/SidebarNavContainer';
import ReduxToastr from 'react-redux-toastr'
import {connect} from 'react-redux';
import { Sidebar,Container} from 'semantic-ui-react';
import {JWT_TOKEN} from '../../universal/constants';
import {meFromToken,setLoginSuccess} from '../redux/modules/auth/login';
import {withRouter} from 'react-router-dom';

class AppContainer extends Component {
 
  constructor(){
    super();
  }
  state = { visible: false }

  componentDidMount(){
     this.props.loadUserFromToken();
  }

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

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
   loadUserFromToken: () => {
      let jwt_token = localStorage.getItem(JWT_TOKEN);
      if(jwt_token){
        dispatch(setLoginSuccess(true));
        ownProps.history.push('/dashboard');
        jwt_token = jwt_token.replace('JWT ', '');
      
        dispatch(meFromToken(jwt_token))
          .then(response => response.json())
          .then((response) => {  
            if (response.token) {
              localStorage.setItem(JWT_TOKEN, response.token);
              dispatch(setLoginSuccess(true));
              ownProps.history.push('/dashboard');
            }
         }).catch(error=>{
           localStorage.removeItem(JWT_TOKEN);
           dispatch(setLoginSuccess(false));
           ownProps.history.push('/login');
         });
        
      }
   }
  }
}

export default withRouter(connect(null,mapDispatchToProps)(AppContainer));
