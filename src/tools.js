

var mode = 'test';

export default {
    appname:'FusaApp',
    GRequester: (callback) => {        
        return google.script.run.withLogger().withSuccessHandler(callback);
    },
    storages: {
        session_token: "fusa_app_session_token",
    },
    auth:function(comp){
       var session_token = localStorage.getItem(this.storages.session_token);
       if(session_token=="null"||session_token==null)
            return comp.props.router.redirect("login");
        return true;
    },
    session:function(comp){
        var session_token = localStorage.getItem(this.storages.session_token);
        if(session_token!=="null"&& session_token!==null){
            comp.props.router.redirect("deskboard",{session_token});
        }
    },
    mode: mode,    
    api:{
        request:(route,params,callback)=>{
            return google.script.run.withLogger().withSuccessHandler(callback).Router(route,params);                  
        },
        routes:{
            login:"auth/login",
            register:"auth/register",
            forgetpasswordIndex:"auth/forgetpassword",
            forgetpasswordConfirmate:"auth/forgetpassword/confirmate",
            forgetpasswordChangepassword:"auth/forgetpassword/changepassword",
            userIndex:"user",            
        }
    },
    errors:(key,data)=>{
        var errors ={
            NotUnique:"El campo "+key+" ya existe.", 
            Require:"El campo "+key+" es requerido.",
            EmailBadFormat:"El campo "+key+" no es un correo electronico.",
            ConfirmationErrror:"El campo "+key+" esta mal confirmado.",
            ResourceNotFound:"El campo "+key+" no fue encontrado en el sistema."
        }
        if(errors[data])
            return errors[data];       
        var r = data.split(':');
        return data.startsWith('NotMaxTo:')?
                    "El numero es mayor que"+r[1]
                : data.startsWith('NotMinTo:')?
                    "El numero es menor que "+r[1]
                : data.startsWith('NotLengthMinTo:')?
                    "El tamaño del vector es menor que "+r[1]
                : null     
    }
}
