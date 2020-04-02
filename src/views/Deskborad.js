import React, { Component } from "react"
import globals from "../globals"


export default class Deskboard extends Component{
    state={
        user:null,        
    }

    componentDidMount(){
        globals.GRequester((res)=>{
            console.log(res);            
            this.setState({user:res.data.user});            
        }).Router("user/index",{session_token:this.props.router.getParam("session_token")});
    }
    
    render(){        
        if(this.state.user)
        return <div>
                   <h2>Welcome {this.state.user.name}</h2>
                </div>;
        return <div></div>                
    }
} 