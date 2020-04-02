import React, {Component} from 'react'

export class Router extends Component{
    constructor(props){
        super(props);

        React.Children.forEach(this.props.children,(v)=>{
            v.props.router = this;
        })  

        this.state={
            view:this.props.view,
            params:{}
        }
    }

    setView=(view,params)=>{
        this.setParams(params);
        this.setState({view});
    }

    

    goToRoot(){
        if(this.props.router==null)return this;
        return this.props.router.goToRoot();
    }

    params = {};
    
    setParams(params){        
        this.goToRoot().setState({params});
    }

    getParam(key){
        return this.goToRoot().state.params[key];
    }

    getParams(){
        return this.goToRoot().state.params;
    }



    render(){        
        var r = React.Children.map(this.props.children,(v)=>{
            if(v.props.name === this.state.view)
                return v;            
        })
        return <div>            
            {r}
        </div>;
    }    
}

