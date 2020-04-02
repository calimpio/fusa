import React, { Component } from "react"
import globals from "../globals"

export default class AppNavigation extends Component{
    state={
        user: this.props.router.getParams().user,
    }

    componentDidMount(){
        if(!this.state.user){            
            globals.GRequester((res)=>{
                if(res.status==200){
                    this.setState({user:res.data.user});
                    var params = this.props.router.getParams();
                    params.user = res.data.user;
                    this.props.router.setParams(params);
                }else this.logout();                          
            }).Router("user/index",{session_token:this.props.router.getParam("session_token")});
        }    
    }

    logout=()=>{
        localStorage.setItem(globals.storages.session_token,null);
        this.props.router.goToRoot().setView("login",{});
    }

    currentView(){
        var view = this.props.router.state.view;

        var nav={
            deskboard:<><li><a href="#">Home</a></li></>
        }
        return <ul className="right">
            {nav[view]}
            <li><a href="#" onClick={this.logout}>Logout</a></li>
        </ul>;       
    }

    content(){

    }
    
    render(){
        if(this.state.user)
        return <div>
            <nav>
                <div className="nav-wrapper">
                    {this.currentView()}
                </div>
            </nav>
            <section className="container">
                {this.content()}
            </section>
            <footer className="page-footer">
                
            </footer>          
        </div>
        return <div>
            <div class="progress">
                <div class="indeterminate"></div>
            </div>
        </div>
    }
}