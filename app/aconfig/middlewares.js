//middlewares

function MiddlewareAuthUser_(req, res, next) {
    var v = new Validation_(req.params);
    v.rule("session_token", { require: [] });
    if (!v.hasErros()) {
        var u = User_().where("session",req.params.session_token).first();
        if (u) {
            req.user = u;
            next();
        } else {
            res.status(403).send({ erros:{session:['session_token_null']}});
        }
    }
    else
        res.status(403).send({ erros: v.getErrors() });
}