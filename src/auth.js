import tools from "./tools"
import { Router } from "./router"

export default {
    request:(url,params,callback)=>{
        if(!params)params={}
        params.session_token = Router.root.getParams().session_token
        tools.api.request(url,params,callback);
    },
    routes:tools.api.routes,
}