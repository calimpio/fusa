import React, { Component } from "react"
import globals from "../../globals";

export default class Register extends Component{
    state={
        email:"",
        password:"",
        name:"",
        username:"",
    }

    onRegister=()=>{
        globals.GRequester((res)=>{
            
        }).Router("auth/register",this.state);
    }

    render(){
        var session_token = localStorage.getItem(globals.storages.session_token);
        if(session_token!=="null"){
            this.props.router.setView("home",{session_token});
        }
        return <div className="container">
            <h2>Registration</h2>
            <div>
                <a href="#" className="right" onClick={()=>this.props.router.setView("login")}>Login</a>                
            </div>
            <div>
                <label>User Name</label>
                <input type="text" value={this.state.username} onChange={e=>{this.setState({username:e.currentTarget.value})}}/>                
            </div>
            <div>
                <label>Email</label>
                <input type="text" value={this.state.email} onChange={e=>{this.setState({email:e.currentTarget.value})}}/>                
            </div>
            <div>
                <label>Name</label>
                <input type="text" value={this.state.name} onChange={e=>{this.setState({name:e.currentTarget.value})}}/>                
            </div>
            <div>
                <label>Password</label>
                <input type="password" value={this.state.password} onChange={e=>{this.setState({password:e.currentTarget.value})}}/>                
            </div>
            <div>
                <button className="btn" onClick={this.onRegister}>Register</button>
            </div>            
        </div>
    }
}