import React, { Component } from "react"
import tools from "../../tools";
import { Link, Router } from "../../router";
import BaseView from "../../layouts/BaseView";



export default class ForgetPassword extends BaseView {
    state = {
        username: "",
        email: "",
        step: 0,
        code: "",
        password: "",
        passwordConfirm: "",
        id: "",
        errors:{}
    }

    steps = () => {
        return [
            <div>
                <div>
                    <label>Usuario:</label>
                    <input type="text" value={this.state.username} onChange={e => {
                        this.setState({ username: e.currentTarget.value });
                    }} />
                </div>
                <div>
                    <label>Email:</label>
                    <input type="text" value={this.state.email} onChange={e => {
                        this.setState({ email: e.currentTarget.value });
                    }} />
                </div>
                <div>
                    <button className="btn" onClick={this.onIndex}>Enviar Codigo Al Correo</button>
                </div>
            </div>,
            <div>
                <div>
                    <label>Te enviamos un correo con un codigo, copialo aquí.</label>
                    <input type="text" value={this.state.code} onChange={e => this.setState({ code: e.currentTarget.value })} />
                </div>
                <div>
                    <button className="btn" onClick={this.onCodeConfirmation}>Confimate</button>
                </div>
            </div>,
            <div>
                <dvi>
                    <label>Contraseña</label>
                    <input type="password" value={this.state.password} onChange={e => this.setState({ password: e.currentTarget.value })} />
                </dvi>
                <dvi>
                    <label>Confirmar Contraseña</label>
                    <input type="password" value={this.state.passwordConfirm} onChange={e => this.setState({ passwordConfirm: e.currentTarget.value })} />
                </dvi>
                <div>
                    <button className="btn" onClick={this.onChangePassword}>Send Password</button>
                </div>
            </div>
        ]
    };

    onIndex = () => {
        tools.api.request(tools.api.routes.forgetpasswordIndex, this.state, (res) => {
            if (res.status == 200) {
                this.setState({ step: 1 });
            }else{
                this.setState({errors:res.data.errors});
            }
        });
    }

    onCodeConfirmation = () => {
        tools.api.request(tools.api.routes.forgetpasswordConfirmate, this.state, (res) => {
            if (res.status == 200) {
                this.setState({ step: 2, id: res.data.user_id });
            }else{
                this.setState({errors:res.data.errors});
            }
        })
    }

    onChangePassword = () => {
        tools.api.request(tools.api.routes.forgetpasswordChangepassword, this.state, res => {
            if (res.status == 200) {
                Router.root.redirect("login");
            }else{
                this.setState({errors:res.data.errors});
            }
        })
    }
    navRight() {
        return <ul>
            <li><Link to="register">Registro</Link></li>
            <li><Link to="login">Ingresar</Link></li>
        </ul>
    }


    content() {
        tools.session(this);
        return <div>
            <div>
                <h2>Recuperar Contraseña</h2>
                <b>Paso: {this.state.step + 1}/3</b>
            </div>
            {this.steps()[this.state.step]}
        </div>;
    }
} 