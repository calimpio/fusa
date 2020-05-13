import React, { Component } from "react"
import tools from "../../tools";
import { Link, Router } from "../../router";
import BaseView from "../../layouts/BaseView";
import { Switch, Button, Input } from "../../components/Utilities";

export default class Login extends BaseView {
    state = {
        username: "",
        password: "",
        keeplogin: false,
        errors:{}
    }

    onLogin = () => {
        tools.api.request(tools.api.routes.login, this.state, res => {
            if (res.status == 200) {
                Router.root.redirect(Router.root.getParams().redirectAfterLogin || "deskboard", {
                    session_token: res.data.session_token,
                    user: res.data.user,
                });
                if (this.state.keeplogin) {
                    localStorage.setItem(tools.storages.session_token, res.data.session_token);
                }
            }
            else{
                this.setState({errors:res.data.errors});
            }
        });
    }

    navRight() {
        return <><ul>            
            <li><Link to="register">Registrarse</Link></li>
        </ul>        
        </>
    }

    content() {
        tools.session(this);
        return <div>
            <h2>Ingresar</h2>
            <Input  type="text" 
                    label="Usuario" 
                    errors={this.renderErrors('username','Usuario')} 
                    value={this.state.username} 
                    onChange={this.onChangeParam('username')} 
                    onBlur={this.removeError('username')} 
                    />           
            <Input  label="Contraseña" 
                    type="password" 
                    errors={this.renderErrors('password','Contraseña')} 
                    value={this.state.password} 
                    onChange={this.onChangeParam('password')} 
                    onBlur={this.removeError('password')}
                    />            
            <div>
                <Switch value={this.state.keeplogin} leftLabel="Mantener sesion:" onChange={this.onChangeParam('keeplogin')}/>                
            </div>
            <div>
                <Button onClick={this.onLogin} >Ingresar</Button>                
            </div>
            <div>
                <ul>
                    <li><Link to="forgetpassword" >¿Olvido la contraseña?</Link></li>
                </ul>
            </div>
        </div>
    }    
} 