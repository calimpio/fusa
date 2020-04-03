import React, { Component } from "react"
import globals from "../../globals";

export default class ForgetPassword extends Component {
    state = {
        username: "",
        email: "",
        step: 0,
        code: "",
        password:"",
        passwordConfirm:"",
        id:"",
    }

    steps = () => {
        return [
            <div>
                <div>
                    <label>User Name:</label>
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
                    <button className="btn" onClick={this.onIndex}>Send Email To Reset The Password</button>
                </div>
            </div>,
            <div>
                <div>
                    <label>We send to you a code to email</label>
                    <input type="text" value={this.state.code} onChange={e=>this.setState({code:e.currentTarget.value})} /> 
                </div>
                <div>
                    <button className="btn" onClick={this.onCodeConfirmation}>Confimate</button>
                </div>                               
            </div>,
            <div>
                <dvi>
                    <label>Password</label>
                    <input type="password" value={this.state.password} onChange={e=>this.setState({password:e.currentTarget.value})} />
                </dvi>
                <dvi>
                    <label>Password Confirm</label>
                    <input type="password" value={this.state.passwordConfirm} onChange={e=>this.setState({passwordConfirm:e.currentTarget.value})} />
                </dvi>
                <div>
                    <button className="btn" onClick={this.onChangePassword}>Send Password</button>
                </div>
            </div>
        ]
    };

    onIndex = () => {
        globals.GRequester((res) => {            
            if (res.status == 200) {
                this.setState({ step: 1 });
            }
        }).Router("auth/forgetpassword/index", this.state);
    }

    onCodeConfirmation = ()=>{
        globals.GRequester((res)=>{            
            if(res.status==200){
                this.setState({ step: 2, id:res.data.user_id });
            }
        }).Router("auth/forgetpassword/confirmate",this.state);
    }

    onChangePassword = ()=>{
        globals.GRequester((res)=>{            
            if(res.status==200){
               this.props.router.setView("login");
            }
        }).Router("auth/forgetpassword/changepassword",this.state);
    }


    render() {
        return (<div className="container">
            <div>
                <h2>Forget Password</h2>
                <b>Step: {this.state.step + 1}/3</b>
            </div>
            {this.steps()[this.state.step]}
            <div>
                <ul>
                    <li><a href="#" onClick={() => this.props.router.setView("register")}>Registration</a></li>
                    <li><a href="#" onClick={() => this.props.router.setView("login")}>Login</a></li>
                </ul>
            </div>
        </div>);
    }
} 