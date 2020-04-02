//middlewares

function MiddlewareAuthUser_(req, res, next) {
    var v = new Validation_(req.params);
    v.rule("session_token", { require: [] });
    if (!v.hasErros()) {
        var u = User_().where("session == " + req.params.session_token);
        if (u.length > 0) {
            req.user = u[0];
            next();
        } else {
            res.status(403).send({ erros: ['session_token_null'] });
        }
    }
    else
        res.status(403).send({ erros: v.getErrors() });
}