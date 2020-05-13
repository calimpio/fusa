import React from "react"
import tools from "../tools"
import AuthNavigation from "../layouts/AuthNavigation";
import AppView from "../layouts/AppView";
import { Link } from "../router";



export default class Deskboard extends AuthNavigation {

    content() {
        console.log(this.state.user)
        return <div className="">
            <h3>Bienvenido {this.state.user.name}</h3>                      
        </div>;
    }
}


