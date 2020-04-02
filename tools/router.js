

function Router(url,qry){
    var params = url.split('/');
    return Routing_(app_router,params,0,new Request_(qry),new Response_());
}



function Routing_(obj,params,i,request,response){
    if(obj && params.length>i)
    if(obj[params[i]]){
        var routes = obj[params[i]];
        if(typeof routes === "function")
            return routes(request,response);
        if(typeof routes === "object"){
            var next = true;
            if(typeof routes.use === "function")
            {
                next = false;
                var res = routes.use(request,response,function(){next=true;});                
                if(!next)return res;
            }
               
            if(next){
                return Routing_(routes.router,params,i+1,request,response);
            }
            return response;
        }
            
    }
    return response.status(404).send();
}


function Response_(){
    var res = {
        status:200
    }

    this.status=function(s){
        res.status = s;
        return this;
    }

    this.send=function(data){
        res.data=data;
        return res;
    }

}

function Request_(query){
    this.params=query;
}