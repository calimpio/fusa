import React from "react"
import tools from "../tools";
import { MaterializeComponent } from "../components/Utilities";

export default class BaseView extends MaterializeComponent {

    navContent() {

    }

    navLeft() {

    }

    navCenter() {

    }

    navRight() {

    }

    content() {

    }

    footer() {
        
    }  
    

    render() {
        return (<>
            <nav className="nav-extended deep-purple darken-3">
                <div className="nav-wrapper">
                    <div className="">
                        <ul>
                        {this.navLeft()}
                        </ul>                        
                    </div>
                    <div className="center">
                        <a href="#" class="brand-logo">{tools.appname}</a>
                        <ul>
                        {this.navCenter()}
                        </ul>                        
                    </div>
                    <div className="right">
                        <ul>
                        {this.navRight()}
                        </ul>
                        
                    </div>
                </div>
                {this.navContent()}
            </nav>
            <div className="container">
                {this.content()}
            </div>
            <br/>
            <footer class="page-footer deep-purple darken-1">
                <div class="container">
                    {this.footer()}
                </div>
                <div class="footer-copyright deep-purple darken-4">
                    <div class="container ">
                        <p>© 2020 Copyright {tools.appname}.</p> 
                        <b>fusa</b>
                    </div>
                </div>
            </footer>
        </>);
    }
} 