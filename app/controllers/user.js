app_router["user"] = {
    use: function (req, res, next) {
        MiddlewareAuthUser_(req, res, next);
    },
    index: function (req, res) {
        return res.send({ user: req.user.public() });
    },
    router: {
        
    }
}

