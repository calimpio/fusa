import React, { Component } from "react"
import tools from "../../tools";
import { Link, Router } from "../../router";
import BaseView from "../../layouts/BaseView";
import { Input, Button } from "../../components/Utilities";

export default class Register extends BaseView {
    state = {
        email: "",
        password: "",
        name: "",
        username: "",
        errors:{},
    }

    onRegister = () => {
        tools.api.request(tools.api.routes.register, this.state, res => {
            console.log(res);            
            if (res.status == 201)
                Router.root.redirect("login");
            else{
                this.setState({errors:res.data.errors});
            }
        });

    }

    navRight() {
        return <ul className="right">            
            <li><Link to="login">Ingresar</Link></li>
        </ul>
    }

    content() {
        tools.session(this);
        return <div>
            <h2>Registro De Usuario</h2>
            <Input  type="text"
                    label="Usuario" 
                    errors={this.renderErrors('username','Usuario')} 
                    value={this.state.username} 
                    onChange={this.onChangeParam('username')} 
                    onBlur={this.removeError('username')}
                    />            
            <Input  type="email"
                    label="Email"  
                    errors={this.renderErrors('email','Email')} 
                    value={this.state.email}                    
                    onChange={this.onChangeParam('email')} 
                    onBlur={this.removeError('email')}
                    />
            <Input  type="text"
                    label="Nombre" 
                    errors={this.renderErrors('name','Nombre')} 
                    value={this.state.name} 
                    onChange={this.onChangeParam('name')} 
                    onBlur={this.removeError('name')}
                    />
            <Input  type="password"
                    label="Contraseña" 
                    errors={this.renderErrors('password','Contraseña')} 
                    value={this.state.password} 
                    onChange={this.onChangeParam('password')} 
                    onBlur={this.removeError('password')}
                    />
            <div>
                <Button onClick={this.onRegister}>Register</Button>
            </div>
        </div>
    }
    
}