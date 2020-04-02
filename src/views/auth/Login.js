import React, { Component } from "react"
import globals from "../../globals";

export default class Login extends Component {
    state = {
        username: "",
        password: "",
    }

    onLogin=()=>{
        globals.GRequester((res)=>{
           if(res.status==200){
               this.props.router.setView("home",{session_token:res.data.session_token});
               
           }
        }).Router("auth/login",this.state);
    }

    render() {
        return (<div>
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
                <button onClick={this.onLogin}>Login</button>
            </div>
            <div>
                <a href="#" onClick={()=>this.props.router.setView("register")}>Registration</a>
                <a href="#" onClick={()=>this.props.router.setView("forgetpassword")}>Forget Password!</a>
            </div>
        </div>);
    }
} 