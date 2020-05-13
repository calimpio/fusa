

function Router(url,qry){
    var params = url.split('/');
    return Routing_(app_router,params,0,new Request_(qry),new Response_());
}


/**
 * 
 * @param {object} obj 
 * @param {string[]} params 
 * @param {number} i 
 * @param {Request_} request 
 * @param {Response_} response 
 */
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
                routes.use(request,response,function(){next=true;});
                if(!next)
                    return response.res();           
            }
            if(params.length>i+1){
            if( typeof routes.model === "function" && 
                (routes.router[params[i+1]] && (params[i+1]==='show' || params[i+1]==='destroy' || params[i+1]==='update')) && 
                typeof routes.column === 'string' && typeof routes.param === 'string'){
                request[params[i]] = routes.model().where(routes.column,request.params[routes.param]).first();                
                if(request[params[i]])
                    return Routing_(routes.router,params,i+1,request,response);
                return response.status(404).send();
            }}else if(typeof routes.index === 'function'){
                return routes.index(request,response);
            }           
               
            if(next){
                return Routing_(routes.router,params,i+1,request,response);
            }
            return response.res();
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

    this.res=function(){
        return res;
    }

}

function Request_(query){
    this.params=query;
}