import React, { Component } from "react";


export class NavContent extends Component {
    constructor(props) {
        super(props);               
    }

    state = {
        view:this.props.view,
    }

    getView() {
        return this.state.view;
    }


    setView(view) {               
        this.setState({ view })
    }

    render() {
        this.props.onSetView(this.state.view); 
        return <div>
            <div class="nav-content center">
                <ul class="tabs tabs-transparent">
                    {this.props.children}
                </ul>
            </div>
        </div>
    }
}


export class NavContentItem extends Component {

    render() {        
        return <li className={"tab " + this.props.disabled ? "disabled" : ""}>
            <a href="#"
                className={this.props.navContentView == this.props.view ? "active" : ""}
                onClick={() => {
                    if(!this.props.disabled){
                        this.props.navContent.setView(this.props.view);
                        this.forceUpdate();
                    }
                }}>
                {this.props.children}
            </a>
        </li>
    }
}