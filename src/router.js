import React, { Component } from 'react'

export class Router extends Component {
    constructor(props) {
        super(props);

        React.Children.forEach(this.props.children, (v) => {
            v.props.router = this;
        })

        Router.root = this.goToRoot();

        this.state = {
            view: this.props.view,
            params: {},
            loaded: false,
            pathParams:{},
        }
    }
    
    /**
     * @type {Router}
     */
    static root;

    redirect = (view, setParams, pathParams) => {
        var params = this.getParams();        
        if(Object.keys(params).length==0)params=setParams;
        else
        for(var i in setParams){
            params[i] = setParams[i];
        }
        var now = new Date();
        var state = {
            'timestamp': now.getTime()
        };
        google.script.history.replace(state, pathParams, view);        
        this.setParams(params);
        this.setState({ view });
    }   

    goToRoot() {
        if (this.props.router == null) return this;
        return this.props.router.goToRoot();
    }

    params = {};

    setParams(params) {
        if(!params)params={};
        this.goToRoot().setState({ params });
    }

    getParam(key) {
        return this.goToRoot().state.params[key];
    }

    getParams() {
        return this.goToRoot().state.params;
    }

    default = "";

    render() {
        google.script.url.getLocation((location) => {
            if (this.state.view !== location.hash)
                this.setState({ view: location.hash, pathParams:location.params, loaded: true });
        });
        
        if (this.state.loaded) {
            var r = React.Children.map(this.props.children, (v) => {
                if (v.props.name === this.state.view)
                    return v;
                if (v.props.default && this.state.view === "") {
                    this.default = v.props.name;
                    return v;
                }
            });
            if (r.length == 0||this.state.view === "")
                this.redirect(this.default);
            return <div>
                {r}
            </div>;
        }
        return <div>

        </div>
    }
}


export class Link extends Component {
    render() {
        var params = this.props.params;
        var pathParams = this.props.pathParams;        
        return <a href="#" onClick={() => Router.root.redirect(this.props.to,params,pathParams)}>
            {this.props.children}
        </a>
    }
}