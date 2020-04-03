import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Router} from "./router"

//views
import Login from './views/auth/Login';
import Register from './views/auth/Register';
import ForgetPassword from './views/auth/ForgetPassword';
import Deskboard from './views/Deskborad';


class Root extends Component {
  render() {
    return (
      <Router view="register">
        <Login name="login" />
        <Register name="register" />
        <ForgetPassword name="forgetpassword" />
        <Router view="deskboard" name="home">            
            <Deskboard name="deskboard" />
        </Router>        
      </Router>
    )
  }
}

let container = document.getElementById('app');
let component = <Root />;
ReactDOM.render(component, container);