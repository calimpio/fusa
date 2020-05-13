import React, { Component } from "react"
import tools from "../tools"
import { Link, Router } from "../router";
import BaseView from "./BaseView";



export default class AppView extends BaseView {
    state = {
        user: Router.root.getParams().user,
    }

    isLogged() {
        var st = Router.root.getParams().session_token;
        return st !== "null" && typeof st === 'string';
    }
    componentDidMount(){
        super.componentDidMount()
        if (!this.state.user) {
            //tokens
            var lst = localStorage.getItem(tools.storages.session_token);
            var pst = Router.root.getParams().session_token;
            tools.api.request(tools.api.routes.userIndex, { session_token: lst !== 'null' && lst ? lst : pst }, res => {
                if (res.status == 200) {
                    this.setState({ user: res.data.user });
                    var params = Router.root.getParams();
                    params.user = res.data.user;
                    Router.root.setParams(params);
                } else this.logout();
            });           

        }      
        
    }    

    logout = () => {
        localStorage.clear();        
        Router.root.setParams({ session_token: null, user: null });        
        this.forceUpdate();
    }

    navRight() {               
        return (<>
            {
                this.isLogged() ?
                    <>
                        {
                            this.state.user ?
                            <>
                                <li>
                                    <a href="#" 
                                        className="dropdown-trigger" 
                                        data-target='user_option_dropper' >
                                        {this.state.user.name}
                                    </a>                                   
                                </li>
                                <ul id="user_option_dropper" className="dropdown-content">
                                    <li><Link to="settings">Configuraciones</Link></li>
                                    <li><a href="#" onClick={this.logout}>Salir</a></li>
                                </ul>
                            </>
                            :
                            null
                            
                        }
                    </>
                    :
                    <>
                        <li><Link to="login" params={{ redirectAfterLogin: this.props.name }}>Ingresar</Link></li>
                        <li><Link to="register" params={{ redirectAfterLogin: this.props.name }}>Registrarse</Link></li>
                    </>
            }
        </>);
    }

} 