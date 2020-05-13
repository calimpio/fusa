import React, { Component } from "react"
import { Link, Router } from "../router";
import AppView from "./AppView";
import ProgressBar from "../components/ProgressBar";



export default class AuthNavigation extends AppView {        

    logout = () => {
        localStorage.clear();
        Router.root.redirect("login", { redirectAfterLogin: this.props.name, session_token: null, user: null });        
    }         
        
    render() {
        if (this.state.user)
            return super.render()
        return <ProgressBar />
    }
}