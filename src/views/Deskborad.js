import React, { Component } from "react"
import globals from "../globals"
import AppNavigation from "./AppNavigation";


export default class Deskboard extends AppNavigation {

    content() {
        return <div className="">
            <h2>Welcome {this.state.user.name}</h2>
        </div>;
    }
} 