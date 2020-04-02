app_router["user"] = {
    use:function(req,res,next){
        return MiddlewareAuthUser_(req,res,next);
    },
    router:{
        index:function(req,res){
            return res.send({user:User_public_porps_(req.user)});
        }
    }
}