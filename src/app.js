import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Router} from "./router"
//views
import Login from './views/auth/Login';
import Register from './views/auth/Register';
import ForgetPassword from './views/auth/ForgetPassword';
import Deskboard, {} from './views/Deskborad';
import tools from './tools';


class Root extends Component {
  
  componentDidMount(){
    Router.root.setParams({session_token:localStorage.getItem(tools.storages.session_token)});
  }

  render() {    
    return (
      <Router>        
        <Login name="login" />
        <Register name="register" default />
        <ForgetPassword name="forgetpassword" />
        <Deskboard name="deskboard" />                     
      </Router>
    )
  }
}

let container = document.getElementById('app');
let component = <Root />;
ReactDOM.render(component, container);