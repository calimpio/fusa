import React, { Component } from "react"
import globals from "../../globals";

export default class Login extends Component {
    state = {
        username: "",
        password: "",
        keeplogin: false,
    }

    onLogin = () => {
        globals.GRequester((res) => {
            if (res.status == 200) {
                this.props.router.setView("home", { session_token: res.data.session_token });
                if (this.state.keeplogin) {
                    localStorage.setItem(globals.storages.session_token, res.data.session_token);
                }
            }
        }).Router("auth/login", this.state);
    }

    render() {
        return (<div className="container">
            <div>
                <h2>Login</h2>
                <label>User Name:</label>
                <input type="text" value={this.state.username} onChange={e => {
                    this.setState({ username: e.currentTarget.value });
                }} />
            </div>
            <div>
                <label>Password:</label>
                <input type="password" value={this.state.password} onChange={e => {
                    this.setState({ password: e.currentTarget.value });
                }} />
            </div>
            <div>
                <div class="switch">
                    <label>
                        Keep login:
                        <input type="checkbox" value={this.state.keeplogin} onChange={e => {
                            this.setState({ keeplogin: e.currentTarget.value });
                        }} />
                        <span class="lever"></span>
                    </label>
                </div>
            </div>
            <div>
                <button className="btn" onClick={this.onLogin}>Login</button>
            </div>
            <div>
                <ul>
                    <li><a href="#" onClick={() => this.props.router.setView("register")}>Registration</a></li>
                    <li><a href="#" onClick={() => this.props.router.setView("forgetpassword")}>Forget Password</a></li>
                </ul>
            </div>
        </div>);
    }
} 