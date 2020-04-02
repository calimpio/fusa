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
        return <div>
            <h2>Registration</h2>
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
                <button onClick={this.onRegister}>Register</button>
            </div>
            <div>
                <a href="#" onClick={()=>this.props.router.setView("login")}>Login</a>                
            </div>
        </div>
    }
}